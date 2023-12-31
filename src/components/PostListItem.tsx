import { Link } from 'react-router-dom';
import { Post } from '../types';
import classes from './PostListItem.module.css';
import { convertDate } from './convertDate/convertDate';

const PostListItem = ({ post }: { post: Post }) => {
  return (
    <div className={classes.post}>
      <div className={classes.postInfo}>
        { post.link ? (
          <Link to={post.link}>
            <h2>{post.title}<span className={classes.postUrl}>({post.link})</span></h2>
          </Link>
        ) : (
          <Link to={`/posts/${post._id}`}>
            <h2>{post.title}</h2>
          </Link>
        )}
        <p>by {post.author.username}</p>
        { post.link && (
          <span><Link to={`/posts/${post._id}`}>Show post</Link></span>
        )}
      </div>
      <p>{convertDate(post.createdAt)}</p>
    </div>
  )
}

export default PostListItem;