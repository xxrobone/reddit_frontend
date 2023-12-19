import { Link, LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import { Post } from '../types';
import classes from './ShowPost.module.css';
import CommentForm from '../components/CommentForm/CommentForm';
import Votes from '../components/Votes/Votes';

export const loader = async (args: LoaderFunctionArgs) => {
  const { id } = args.params;

  const response = await fetch(
    import.meta.env.VITE_SERVER_URL + '/posts/' + id,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const posts = await response.json();

  return posts;
};

const ShowPost = () => {
  const post = useLoaderData() as Post;
  /*   const commentsFetcher = useFetcher({ key: 'comment-form-' + post._id }); */
  console.log(post);
  return (
    <>
      <div className={classes.post}>
        <div className={classes.postInfo}>
          {post.link ? (
            <Link to={post.link}>
              <h2>
                {post.title}
                <span className={classes.postUrl}>({post.link})</span>
              </h2>
            </Link>
          ) : (
            <h2>{post.title}</h2>
          )}
          <p>by {post.author.username}</p>
          {post.body && (
            <div className={classes.postBody}>
              <p>{post.body}</p>
            </div>
          )}
        </div>
        <div>
          <Votes post={post} />
        </div>
        <CommentForm postId={post._id} />
        <section className={classes.comments}>
          {post.comments?.map((comment) => (
            <p key={comment._id} className={classes.comment}>
              {comment.body} - {comment && comment.author.username}
            </p>
          ))}
        </section>
      </div>
    </>
  );
};

export default ShowPost;
