import { useState } from 'react';
import 'bootbox/dist/bootbox.all.min.js';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { createPost, editPost, getPost } from '../services/posts';
import { useParams } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';

export const Spinner = () => {
    return (
        <div className="d-flex flex-row align-items-center justify-content-center">
            <div className="spinner-border text-success" role="status">
            </div>
        </div>
    );
}

export const PostEditScreen = () => {
    const [sending, setSending] = useState({send: false});
    const { isAuthenticated, user } = useAuth0();
    const { idc, idp } = useParams();
    const [form, setForm] = useState({title: '', body: ''});

    useEffect( () => {
        const loadPostData = async () => {
            const postData = await getPost(idp);
            setForm(postData);
            console.log(postData);
        }

        loadPostData();
    }, []);

    
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if( form.title.length == 0 || form.title.length == 0 )
        {
            alert("all fields are required to fill!");
        }
        else
        {
            if( !isAuthenticated )
            {
                alert("You need to log in to perform this action");
            }
            else
            {
                setSending({send: true});
                let r = await editPost(idp, idc, user.email, form).then( () => setTimeout(() => window.location.href=`/categories/${idc}/post/${idp}`, 2000) );
            }
        }
       
    }

    const handleChange = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;

        setForm({
            ...form,
            [fieldName]: fieldValue
        });

        console.log(form);
    }

    return (
        <div className="container-fluid my-2">
            <div className="card">
                <div className="card-header"><span className="card-title">Edit post</span></div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="title" className="form-label">Title:</label>
                            <input type="text" name="title" id="title" className="form-control" onChange={handleChange} value={form.title}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="body" className="form-label">Body:</label>
                            <CKEditor
                                editor={ ClassicEditor }
                                data={form.body}
                                name="body"
                                onReady={ editor => {
                                    // You can store the "editor" and use when it is needed.
                                    console.log( 'Editor is ready to use!', editor );
                                } }
                                onChange={ ( event, editor ) => {
                                    const data = editor.getData();
                                    form.body = data;
                                } }
                                onBlur={ ( event, editor ) => {
                                    console.log( 'Blur.', editor );
                                } }
                                onFocus={ ( event, editor ) => {
                                    console.log( 'Focus.', editor );
                                } }
                            />
                        </div>

                        <div className="form-group my-1">
                            <button type="submit" className="btn btn-info btn-block text-white w-100">Update</button>
                        </div>
                        <div className="form-group">
                            { sending.send && <Spinner/> }
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    );
}