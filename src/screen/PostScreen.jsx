import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { deletePost, getPost } from "../services/posts";
import { Link } from "react-router-dom";
export const PostScreen = () => {
    const { idc, idp } = useParams();
    const [post, setPost] = useState({});
    
    useEffect( () => {
        
        const loadPostData = async () => {
            const postData = await getPost(idp);
            setPost(postData);
            console.log(postData);        }

        loadPostData();

    }, [])

    const delPost = (id) => {
        const rsp = prompt("Write 'yes' for confirm delete");
        if(rsp=="yes")
        {
            const r = deletePost(id);
            r.then( () => setTimeout(() => window.location.href=`/categories/${idc}`, 2000) );
        }
        else
        {
            alert("Action canceled");
        }
    }

    return (
        <div className="container-fluid">
            <div className="card my-3">
                <div className="card-header">
                    <div className="d-flex flex row">
                        <div className="d-flex flex-row">
                            <span className="mx-1">Title:</span>
                            {post.title}
                        </div>
                        
                        <div className="mx-1">
                            Published by {post.userId}
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="" dangerouslySetInnerHTML={{__html: post.body}}>

                    </div>
                </div>
                <div className="card-footer d-flex flex-row align-items-end justify-content-end">
                    <div className="btn-group">
                        <Link className="btn btn-outline-info" to={`/categories/${idc}/post/${idp}/edit`}>Edit</Link>
                        <button className="btn btn-outline-danger" onClick={()=>delPost(idp)}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
}