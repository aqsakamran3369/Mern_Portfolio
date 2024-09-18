import { Form, Input, message, Modal } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, ReloadData, showLoading } from '../redux/rootSlice';
import axios from 'axios';

function Experiences() {
    const dispatch = useDispatch();
    const { portfolioData } = useSelector((state) => state.root);
    const { experiences } = portfolioData;
    const [showAddEditModal, setshowAddEditModal] = React.useState(false);
    const [selectedItemForEdit, setselectedItemForEdit] = React.useState(null);
    const [type, setType] = React.useState("add");

    const onFinish = async (values) => {
        try {
            dispatch(showLoading());
            let response;
            if (selectedItemForEdit) {
                response = await axios.post("/api/portfolio/update-experience", {
                    ...values,
                    _id: selectedItemForEdit._id,
                });
            } else {
                response = await axios.post("/api/portfolio/add-experience", values);
            }

            dispatch(HideLoading());
            if (response.data.success) {
                message.success(response.data.message);
                setshowAddEditModal(false);
                setselectedItemForEdit(null); // Correct usage of the setter function
                dispatch(ReloadData(true));
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    const onDelete = async (item) => {
        try {
            dispatch(showLoading());
            const response = await axios.post("/api/portfolio/delete-experience", { _id: item._id });
            if (response.data.success) {
                message.success(response.data.message);
                dispatch(HideLoading());
                dispatch(ReloadData(true));
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    return (
        <div>
            <div className='flex justify-end'>
                <button className='bg-primary text-white px-5 py-2' onClick={() => {
                    setselectedItemForEdit(null);  // Reset the form for adding
                    setshowAddEditModal(true);
                    setType("add");
                }}>
                    Add Experience
                </button>
            </div>

            <div className='grid grid-cols-4 sm:grid-cols-1 lg:grid-cols-4 gap-5 mt-5'>
                {experiences.map((experience) => (
                    <div key={experience._id} className='shadow border-2 p-5 border-e-gray-400'>
                        <h1 className='text-primary text-xl font-bold'>{experience.period}</h1>
                        <h1 className='text-primary py-1'>Company: {experience.company}</h1>
                        <h1 className='text-primary py-1'>Role: {experience.title}</h1>
                        <h1 className='text-primary'>{experience.description}</h1>
                        <div className='flex justify-end gap-5 mt-5'>
                            <button className='bg-secondry text-white px-5 py-2' onClick={() => onDelete(experience)}>Delete</button>
                            <button className='bg-primary text-white px-5 py-2' onClick={() => {
                                setselectedItemForEdit(experience);  // Set item for editing
                                setshowAddEditModal(true);
                                setType("edit");
                            }}>
                                Edit
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {showAddEditModal && (
                <Modal visible={showAddEditModal} title={selectedItemForEdit ? "Edit Experience" : "Add Experience"} footer={null} onCancel={() => {
                    setshowAddEditModal(false);
                    setselectedItemForEdit(null);  // Correct reset when modal closes
                }}>
                    <Form layout="vertical" onFinish={onFinish} initialValues={selectedItemForEdit || {}}>
                        <Form.Item name='period' label='Period'>
                            <Input placeholder='Period' />
                        </Form.Item>
                        <Form.Item name='company' label='Company'>
                            <Input placeholder='Company' />
                        </Form.Item>
                        <Form.Item name='title' label='Title'>
                            <Input placeholder='Title' />
                        </Form.Item>
                        <Form.Item name='description' label='Description'>
                            <Input placeholder='Description' />
                        </Form.Item>
                        <div className='flex justify-end'>
                            <button className='border-primary text-primary px-5 py-2' onClick={() => {
                                setshowAddEditModal(false);
                                setselectedItemForEdit(null);  // Reset on cancel
                            }}>Cancel</button>
                            <button className='bg-primary text-white px-5 py-2'>
                                {selectedItemForEdit ? "Update" : "Add"}
                            </button>
                        </div>
                    </Form>
                </Modal>
            )}
        </div>
    );
}

export default Experiences;
