import { Form, Input, message, Modal } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, ReloadData, showLoading } from '../redux/rootSlice';
import axios from 'axios';

function AdminProjects() {
    const dispatch = useDispatch();
    const { portfolioData } = useSelector((state) => state.root);
    const { projects } = portfolioData;
    const [showAddEditModal, setshowAddEditModal] = React.useState(false);
    const [selectedItemForEdit, setselectedItemForEdit] = React.useState(null);
    const [type, setType] = React.useState("add");

    const onFinish = async (values) => {
        try {
            dispatch(showLoading());
            let response;
            if (selectedItemForEdit) {
                response = await axios.post("/api/portfolio/update-projects", {
                    ...values,
                    _id: selectedItemForEdit._id,
                });
            } else {
                response = await axios.post("/api/portfolio/add-projects", values);
            }

            dispatch(HideLoading());
            if (response.data.success) {
                message.success(response.data.message);
                setshowAddEditModal(false);
                setselectedItemForEdit(null);
                dispatch(ReloadData(true));
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    const onDelete = async (project) => {
        try {
            dispatch(showLoading());
            const response = await axios.post("/api/portfolio/delete-projects", { _id: project._id });
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
                    setselectedItemForEdit(null);
                    setshowAddEditModal(true);
                    setType("add");
                }}>
                    Add Project
                </button>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-5 mt-5'>
                {projects.map((project) => (
                    <div key={project._id} className='shadow border-2 p-5 border-e-gray-400'>
                        <h1 className='text-primary text-xl font-bold'>{project.title}</h1>
                        <hr />
                        <br/>
                        <img src={project.image} className='h-60 w-full object-cover' alt='Project' />
                        <h1 className='text-primary py-1'>Description: {project.description}</h1>
                        <h1 className='text-primary py-1'>Technologies: {project.technologies.join(", ")}</h1>
                        <h1 className='text-primary py-1'>Link: <a href={project.link} target="_blank" rel="noopener noreferrer">{project.link}</a></h1>
                        <div className='flex justify-end gap-5 mt-5'>
                            <button className='bg-secondry text-white px-5 py-2' onClick={() => onDelete(project)}>Delete</button>
                            <button className='bg-primary text-white px-5 py-2' onClick={() => {
                                setselectedItemForEdit(project);
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
                <Modal visible={showAddEditModal} title={selectedItemForEdit ? "Edit Project" : "Add Project"} footer={null} onCancel={() => {
                    setshowAddEditModal(false);
                    setselectedItemForEdit(null);
                }}>
                    <Form layout="vertical" onFinish={onFinish} initialValues={{
                        ...selectedItemForEdit,
                        technologies: selectedItemForEdit?.technologies.join(", ")
                    } || {}}>
                        <Form.Item name='title' label='Title'>
                            <Input className='input'  placeholder='Project Title' />
                        </Form.Item>
                        <Form.Item name='description' label='Description'>
                            <Input.TextArea className='input' placeholder='Project Description' />
                        </Form.Item>
                        <Form.Item name='technologies' label='Technologies'>
                            <Input className='input' placeholder='Technologies (comma separated)' />
                        </Form.Item>
                        <Form.Item name='image' label='Image URL'>
                            <Input className='input' placeholder='Image URL' />
                        </Form.Item>
                        <Form.Item name='link' label='Project Link'>
                            <Input className='input' placeholder='Project Link' />
                        </Form.Item>
                        <div className='flex justify-end'>
                            <button className='border-primary text-primary px-5 py-2' onClick={() => {
                                setshowAddEditModal(false);
                                setselectedItemForEdit(null);
                            }}>Cancel</button>
                            <button className='bg-primary text-white px-5 py-2' htmlType='submit'>
                                {selectedItemForEdit ? "Update" : "Add"}
                            </button>
                        </div>
                    </Form>
                </Modal>
            )}
        </div>
    );
}

export default AdminProjects;
