import React from 'react';
import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button'; 
import { auth, createUserProfileDocument } from '../../firebase/firebase-util';

import './sign-up.scss';

//like signin we need to know what user is typing
class SignUp extends React.Component{
    constructor(){
        super(); 
        this.state= {
            displayName: '',
            email:'',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit= async event=>{
        //prevent default submit action
        event.preventDefault();
        const {displayName,email,password,confirmPassword}= this.state;
        if(password!== confirmPassword){
            alert('passwords do not match');
            return;
        }
        try {
            const {user} = await auth.createUserWithEmailAndPassword(email,password);
            await createUserProfileDocument(user,{displayName});
            //after this clear out the field using setstate
            //for that we need to await createUser() method
            this.setState({
                displayName: '',
                email:'',
                password: '',
                confirmPassword: ''
            });
        } catch (error) {
            console.error(error);   
        }
    };
    handleChange= event =>{
        //destructure the event
        const {name,value}= event.target;
        this.setState({[name]: value});
    }
    render(){
        const {displayName,email,password,confirmPassword}= this.state;
        return(
            <div className='sign-up'>
                <h2 className='title'>I do not have a account</h2>
                <span>SignUp with email and password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput
                        type= 'text'
                        name='displayName'
                        value={displayName}
                        onChange= {this.handleChange}
                        label='Display Name' required 
                    />
                    <FormInput
                        type= 'email'
                        name='email'
                        value={email}
                        onChange= {this.handleChange}
                        label='Email' required 
                    />
                    <FormInput
                        type= 'password'
                        name='password'
                        value={password}
                        onChange= {this.handleChange}
                        label='Password ' required 
                    />
                    <FormInput
                        type= 'password'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange= {this.handleChange}
                        label='Confirm Password' required 
                    />
                    <CustomButton type= 'submit'>Sign Up </CustomButton>
                    
                </form>
            </div>
        );
    }
}
export default SignUp;