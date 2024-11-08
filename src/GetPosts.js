import { gql } from '@apollo/client';
export const GET_POSTS = gql`
  query GetPosts($userId: ID!) {
    posts(userId: $userId) {
      id
      title
      body
    }
  }
`;