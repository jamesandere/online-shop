import styled from 'styled-components';

export const StyledForm = styled.form`
  max-width: 350px;
  margin: 2rem auto;
  width: 100%;

  h2 {
      margin-bottom: 1rem;
  }

  button, input {
      width: 100%;
      height: 40px;
      margin-bottom: 1rem;
      outline: none;
      padding: 7px;
      border: 1px solid rgb(220, 220, 220);
      border-radius: 5px;

      &:focus {
          border: 1px solid #fca311;
      }
  }

  button {
          cursor: pointer;
          
          &:focus {
              border: none;
          }
      }
`;
