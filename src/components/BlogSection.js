
import React from 'react';
import { Row, Col, Card, Badge } from 'react-bootstrap';
import { posts } from '../data/blogData'; 

function BlogSection() {
  return (
    <div className="my-5">
      <h2>📰 Blog & Noticias</h2>
      <Row xs={1} md={3} className="g-4 mt-2">
        {posts.map((post, index) => (
          <Col key={index}>
            <Card className="h-100">
              <Card.Body>
                <Card.Title>{post.t}</Card.Title>
                <Card.Text>{post.d}</Card.Text>
                <div>
                  {post.k.map((tag, tagIndex) => (
                    <Badge pill bg="secondary" key={tagIndex} className="me-1">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default BlogSection;