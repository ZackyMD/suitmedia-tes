import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Ideas(){
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortOrder, setSortOrder] = useState('-published_at');
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  useEffect(() => {
    fetchData(page, pageSize, sortOrder);
  },[page, pageSize, sortOrder]);

  const fetchData = async (page, pageSize, sortOrder) => {
    try {
      const response = await axios.get('/api/ideas', {
        params: {
          'page[number]': page,
          'page[size]': pageSize,
          append: ['small_image', 'medium_image'],
          sort: sortOrder,
        },
      });
      console.log('isi respone:', response)
      console.log('isi router:', router)
      setPosts(response.data.data);
      setTotalPages(response.data.meta.last_page);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(parseInt(e.target.value));
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      <div>
        <label>Sort By:</label>
        <select value={sortOrder} onChange={handleSortChange}>
          <option value="-published_at">Newest</option>
          <option value="published_at">Oldest</option>
        </select>
      </div>
      <div>
        <label>Show Per Page:</label>
        <select value={pageSize} onChange={handlePageSizeChange}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
      <div className="posts-grid">
        {posts.map((post, index) => (
          <div key={post.id} className="post-card">
            <Image
              src={post.medium_image[0].url}
              alt={post.title}
              width={150}
              height={150}
              className="post-thumbnail"
              loading="lazy"
            />
            <h5 className="post-date">{post.created_at}</h5>
            <h5 className="post-title">{post.title}</h5>
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            disabled={page === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};
