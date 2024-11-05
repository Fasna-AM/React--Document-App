import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardMedia, Typography, Button, CardActions, Modal, Box, TextField, CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';
import { db } from '../config/firebase'
import { getDocs, collection, addDoc, doc, deleteDoc } from 'firebase/firestore';



const Home = () => {

    const [title, setTitle] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [allDocuments, setAllDocuments] = useState([])
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setTitle("")
        setImageUrl("")


    }

    useEffect(() => {
        getAllDocoments()
    }, [])

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        boxShadow: 24,
        p: 4,
        backgroundColor: 'rgb(255,255,255,0.7)'
    };

    const documentCollectionRef = collection(db, "documents") // create reference to our document collection

    const getAllDocoments = async () => {
        try {
            const data = await getDocs(documentCollectionRef)
            const docs = data.docs.map((doc) => (
                { ...doc.data(), id: doc.id }
            ))
            // console.log(docs);
            setAllDocuments(docs)

        } catch (err) {
            console.log("Error fetching documents: ", err);

        }


    }

    const handleSave = async () => {
        try {
            await addDoc(documentCollectionRef, {
                title,
                imageUrl,
                description: ""

            })
            alert("Document Added successfully")
            handleClose()
            getAllDocoments()


        } catch (err) {
            console.log(err);

        }
    }

    const handleDelete = async(docId)=>{
        const document = doc(db,"documents",docId)
        try{
            await deleteDoc(document)
            getAllDocoments()

        }catch(err){
            console.log(err);
            
        }
    }

    return (
        <div className='d-flex justify-content-center align-items-center flex-column py-3' style={{ minHeight: "100vh" }}>
            <div>
                <h1 className="fw-bolder shadow p-3 ">Document App</h1>
                <Button className='btn bg-primary ms-5 text-white m-3 fw-bolder' onClick={handleOpen}>Add Document</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"

                >
                    <Box sx={style} className='rounded ' >
                        <Typography id="modal-modal-title" variant="h6" component="h2" className='text-center text-black fw-bolder'>
                            Document Details !!!
                        </Typography>
                        <div className="d-flex">
                            <label htmlFor="" className='mt-3 ms-3 text-black fw-bolder'>Title : </label>
                            <TextField id="demo-helper-text-misaligned-no-helper" label="Title" className='m-2' onChange={e => setTitle(e.target.value)} />
                        </div>
                        <div className="d-flex">
                            <label htmlFor="" className='mt-3 text-black fw-bolder'>Image Url: </label>
                            <TextField id="demo-helper-text-misaligned-no-helper" label="Image Url" className='m-2' onChange={e => setImageUrl(e.target.value)} />
                        </div>
                        <Button className='btn bg-primary text-white me-3' onClick={handleSave} style={{ float: "right" }}>Save</Button>
                    </Box>

                </Modal>
            </div>
            <div className='row ms-3  w-75'>
                {
                    allDocuments?.length>0 ?
                    allDocuments?.map((document, index) => (
                        <Card key={index} className='rounded bg-transparent shadow mb-3 me-3 border col-lg-4' sx={{ maxWidth: 345 }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={document.imageUrl
                                    }
                                    alt="Doc img"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div" className='text-white fw-bolder'>
                                        {document.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }} className='text-white '>
                                        {document.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Link to={`/${document.id}/edit`}>
                                    <i className="fa-solid fa-pen-to-square ms-5 text-white "></i>
                                </Link>
                                <Button onClick={()=>handleDelete(document.id)}>
                                    <i className="fa-solid fa-trash ms-5 text-white"></i>

                                </Button>


                            </CardActions>
                        </Card>
                    )):
                    <div className='text-warning fw-bolder'>
                        * No Documents are added yet
                    </div>
                }
            </div>
        </div>
    )
}

export default Home