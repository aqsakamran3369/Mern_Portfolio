import React from 'react';
import { Form, Input, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, SetPortfolioData, showLoading } from "../redux/rootSlice";
import axios from 'axios';


function AdminIntro() {
    const dispatch = useDispatch();
    const { portfolioData } = useSelector((state) => state.root);
    
    // Set default values if portfolioData or intro is null
    const intro = portfolioData?.intro || {};

    const onFinish = async (values) => {
        try {
           dispatch(showLoading())
           const response = await axios.post("/api/portfolio/update-intro",{ ...values,
            _id: portfolioData.intro._id,
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
                    initialValues={portfolioData?.intro}
                >
                    <Form.Item name="welcomeText" label="Welcome Text">
                        <Input className='input' placeholder='Welcome Text'/>
                    </Form.Item>
                    <Form.Item name="firstName" label="First Name">
                        <Input className='input' placeholder='First Name'/>
                    </Form.Item>
                    <Form.Item name="lastName" label="Last Name">
                        <Input className='input' placeholder='Last Name'/>
                    </Form.Item>
                    <Form.Item name="caption" label="Caption">
                        <Input className='input' placeholder='Caption'/>
                    </Form.Item>
                    <Form.Item name="description" label="Description">
                        <Input.TextArea className='textarea' placeholder='Description'/>
                    </Form.Item>
                    <div className='flex justify-end w-full'>
                        <button className='px-10 py-2 bg-primary text-white' type='submit'>SAVE</button>
                    </div>
                </Form>
            
        
        </div>
    );
}

export default AdminIntro;
