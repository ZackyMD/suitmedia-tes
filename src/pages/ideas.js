import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Banner from "@/components/Banner";
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Ideas() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortOrder, setSortOrder] = useState('-published_at');
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchData(page, pageSize, sortOrder);
  }, [page, pageSize, sortOrder]);

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
      setPosts(response.data.data);
      console.log("response data: ", response.data.data)
      setTotalPages(response.data.meta.last_page);
      setTotalItems(response.data.meta.total);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred while fetching data.');

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

  const renderPagination = () => {
    const paginationItems = [];
    const maxPagesToShow = 5;

    if (page > 1) {
      paginationItems.push(
        <button key="first" onClick={() => handlePageChange(1)}>
          &lt;&lt;
        </button>
      );
      paginationItems.push(
        <button key="prev" onClick={() => handlePageChange(page - 1)}>
          &lt;
        </button>
      );
    }

    const startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (startPage > 1) {
      paginationItems.push(<span key="start-ellipsis">...</span>);
    }

    for (let i = startPage; i <= endPage; i++) {
      paginationItems.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={page === i}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      paginationItems.push(<span key="end-ellipsis">...</span>);
      paginationItems.push(
        <button key="last" onClick={() => handlePageChange(totalPages)}>
          &gt;&gt;
        </button>
      );
    }

    if (page < totalPages) {
      paginationItems.push(
        <button key="next" onClick={() => handlePageChange(page + 1)}>
          &gt;
        </button>
      );
    }

    return paginationItems;
  };

  return (
    <>
    <Banner/>
      <div>
      <div className="controls">
        <div className="showing-info">
          Showing {page * pageSize - pageSize + 1} -{' '}
          {Math.min(page * pageSize, totalItems)} of {totalItems}
        </div>
        <div className="sort-controls">
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
        </div>
      </div>
      {error && <div className="error-message">{error}</div>}
      <div className="posts-grid">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <div className="images">
              <Image
                src={post.small_image.url}
                alt={post.title}
                width={150}
                height={150}
                loading="lazy"
                fetchpriority="low"
              />
            </div>
            <h5 className="post-date">{post.created_at}</h5>
            <h5 className="post-title">{post.title}</h5>
          </div>
        ))}
      </div>
      <div className="pagination">{renderPagination()}</div>
    </div>
    </>

  );
}