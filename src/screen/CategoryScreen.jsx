import { useState } from 'react';
import { useEffect } from 'react';
import Moment from 'react-moment';
import { useParams } from 'react-router-dom';
import { getPostsByCategory } from '../services/posts';
import 'moment/dist/moment';
import { Link } from 'react-router-dom';

export const CategoryCard = (category) => {
    return (
        <div>
            <div className="card mx-1 ml-0">
                <div className="card-body">
                    {category.post.title}
                </div>
                <div className="card-footer">
                    Posted <Moment toNow>{category.post.createdAt}</Moment>
                </div>
            </div>
        </div>
    );
};

export const CategoryScreen = () => {

    const { id } = useParams();
    const [posts, setPosts] = useState([]);

    useEffect( () => {

        const loadCategory = async () => {
            
            setPosts( await getPostsByCategory(id) );
            console.log(posts);
        }

        loadCategory();
    }, [id]);

    return (
        <div className="container-fluid mt-2">

            <div className="d-flex flex-row mx-1 my-2">
                <Link to={`/categories/${id}/create`} className="btn btn-success text-white">Create new post</Link>
            </div>
            <div className="ms-auto">
                <div className="d-flex flex-row">
                    { posts.map(e => <CategoryCard key={e.id} post={e}/>) }
                </div>
            </div>

        </div>
    );
}