import React from 'react';
import { Form, Input, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, SetPortfolioData, showLoading } from "../redux/rootSlice";
import axios from 'axios';


function AdminContact() {
    const dispatch = useDispatch();
    const { portfolioData } = useSelector((state) => state.root);
    
    // Set default values if portfolioData or intro is null
    const intro = portfolioData?.contact || {};

    const onFinish = async (values) => {
        try {
           dispatch(showLoading())
           const response = await axios.post("/api/portfolio/update-contact",{ ...values,
            _id: portfolioData.contact._id,
           });
           dispatch(HideLoading())
           if(response.data.success){
           message.success(response.data.message)
           }
           else{
            message.error(response.data.message)
           }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message)
        }
    };

    return (
        <div>
            
                <Form
                    onFinish={onFinish}
                    layout='vertical'
                    initialValues={portfolioData?.contact}
                >
                    
                    <Form.Item name="name" label="Name">
                        <Input className='input' placeholder='Name'/>
                    </Form.Item>
                    <Form.Item name="gender" label="Gender">
                        <Input className='input' placeholder='Gender'/>
                    </Form.Item>
                    <Form.Item name="age" label="Age">
                        <Input className='input' placeholder='Age'/>
                    </Form.Item>
                    <Form.Item name="email" label="Email Address">
                        <Input className='input' placeholder='Email Address'/>
                    </Form.Item>
                    <Form.Item name="mobile" label="Phone No">
                        <Input className='input' placeholder='Phone No'/>
                    </Form.Item>
                    <Form.Item name="address" label="Address">
                        <Input className='input' placeholder='Address'/>
                    </Form.Item>
                    
                    <div className='flex justify-end w-full'>
                        <button className='px-10 py-2 bg-primary text-white' type='submit'>SAVE</button>
                    </div>
                </Form>
            
        
        </div>
    );
}

export default AdminContact;
