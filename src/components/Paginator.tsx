import React from 'react';
import classes from './Paginator.module.css';

interface PaginatorProps {
  currentPage: number;
  totalPages: number;
  setPage: (page: number) => void;
}

const Paginator = (props: PaginatorProps) => {
   /*  const pages = Array.from(Array(props.totalPages).keys()).map((i) => i + 1); */
    
    const pages = Array.from({length: props.totalPages}, (_, i) => i + 1)

  return (
    <div className={classes.pagination}>
      {pages.map((page) => (
        <button key={page} className={page === props.currentPage ? classes.active : ''} onClick={() => props.setPage(page)}>{page}</button>
      ))}
    </div>
  );
};

export default Paginator;
