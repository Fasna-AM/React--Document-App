import { Button } from '@mui/material';
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import {  doc, getFirestore, updateDoc } from 'firebase/firestore';



const Edit = () => {
    const { id } = useParams()
    const [content, setContent] = useState("");
    const navigate = useNavigate()
    const db = getFirestore();

 
    
    

    const handleUpdate = async () => {
        if (id) {
            try {

                const document = doc(db, "documents", id)
                console.log(content);
                const parser = new DOMParser()
                const plainText = parser.parseFromString(content, "text/html").body.textContent
                // console.log(plainText);
                await updateDoc(document, { description:plainText})
                alert("Updation complete successfully !!!")
                navigate('/')

            } catch (err) {
                console.log(err);

            }
        }
    }

    return (

        <div className='d-flex justify-content-center align-items-center flex-column ' style={{ minHeight: "50vh" }}>
            <ReactQuill theme='snow' className=' w-50 shadow' value={content} onChange={setContent} />
            <Button className='btn bg-primary text-white fw-bolder mt-3' onClick={handleUpdate}>Update</Button>

        </div>


    )
}

export default Edit