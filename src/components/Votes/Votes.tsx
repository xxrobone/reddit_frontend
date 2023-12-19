import { Form, ActionFunctionArgs, useLocation, redirect } from 'react-router-dom';
import auth from '../../lib/auth';
import { Post } from '../../types';
import {
  PiArrowFatLineUpFill,
  PiArrowFatLineDownDuotone,
} from 'react-icons/pi';

import styles from './Votes.module.scss';

export const action = async (args: ActionFunctionArgs) => {
  const { postId } = args.params;

  const formData = await args.request.formData();

  const vote = formData.get('vote');

  const path =
    vote === 'up' ? `/posts/${postId}/upvote` : `/posts/${postId}/downvote`;

  const response = await fetch(import.meta.env.VITE_SERVER_URL + path, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth.getJWT()}`,
    },
    /*  body: JSON.stringify({ commentBody: formData.get('body') }), */
  });

  if (!response.ok) {
    const { message } = await response.json();
    return { message };
  }

  return redirect(formData.get('returnTo')?.toString() || '/')
};

const Votes = ({ post }: { post: Post }) => {
  const location = useLocation();

  return (
    <footer>
      <Form method='POST' action={`/posts/${post._id}/vote`}>
        <input
          type='hidden'
          name='returnTo'
          value={location.pathname + location.search}
        />
        <input type='hidden' value='up' name='vote' />
        <button type='submit'>
          <PiArrowFatLineUpFill />
        </button>
      </Form>

      <span>{post.score}</span>
          <Form method='POST' action={`/posts/${post._id}/vote`}>
          <input
          type='hidden'
          name='returnTo'
          value={location.pathname + location.search}
        />
        <input type='hidden' value='down' name='vote' />
        <button type='submit'>
          {' '}
          <PiArrowFatLineDownDuotone />
        </button>
      </Form>

      <span className={styles.reply}>reply </span>
    </footer>
  );
};

export default Votes;
