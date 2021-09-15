import { useState } from 'react';
import 'bootbox/dist/bootbox.all.min.js';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { createPost } from '../services/posts';
import { useParams } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';

export const Spinner = () => {
    return (
        <div className="d-flex flex-row align-items-center justify-content-center">
            <div className="spinner-border text-success" role="status">
            </div>
        </div>
    );
}
export const PostCreateScreen = () => {
    const [form, setForm] = useState({title: '', body: ''});
    const [sending, setSending] = useState({send: false});
    const { isAuthenticated, user } = useAuth0();
    const { id } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("H1");
        if( form.title.length == 0 || form.title.length == 0 )
        {
            console.log("H2");
            alert("all fields are required to fill!");
        }
        else
        {
            console.log("H3");
            if( !isAuthenticated )
            {
                console.log("H4");
                alert("You need to log in to perform this action");
            }
            else
            {
                setSending({send: true});
                let r = await createPost(id, user.email, form).then( () => setTimeout(() => window.location.href=`/categories/${id}`, 2000) );
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
                <div className="card-header"><span className="card-title">Create a new post</span></div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="title" className="form-label">Title:</label>
                            <input type="text" name="title" id="title" className="form-control" onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="body" className="form-label">Body:</label>
                            <CKEditor
                                editor={ ClassicEditor }
                                data="<p>Hello from CKEditor 5!</p>"
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
                            <button type="submit" className="btn btn-info btn-block text-white w-100">Create</button>
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