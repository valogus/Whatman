import styled from 'styled-components';


export const Container = styled.div`
box-shadow: ${(props) => (props.isDragging ? '45px 45px 45px rgba(0, 0, 0, 0.35)' : '0 5px 45px rgba(0, 0, 0, 0.2)')};
background-color: #f4f5f7;
  min-width: 300px;
  min-height: 400px;
  border-radius: 6px;
  border: 3px solid lightgrey;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin: 10px;
`;

export const Title = styled.h4`
background-color: ${(props) => (props.isDragging ? 'rgb(217, 227, 237)' : '#f4f5f7')};
font-size: 1.3rem;
font-weight: 600;
padding: 8px;
display: flex;
justify-content: space-between;
border-radius: 6px;
align-items:center;
`
export const TaskList =styled.div`
padding:8px;
border-radius: 6px;
background-color: ${(props) => (props.isDraggingOver ? 'rgb(217, 227, 237)' : '#f4f5f7')};
`
export const Task = styled.div`
box-shadow: ${(props) => (props.isDragging ? '0 5px 45px rgba(0, 0, 0, 0.35)' : '0 5px 45px rgba(0, 0, 0, 0.12)')};
opacity:1;
width: 100%;
border: 2px solid lightgrey;
padding: 8px;
border-radius: 6px;
margin-bottom: 8px;
cursor: grab;
background-color: ${(props) => (props.isDragging ? '#fefae9' : 'white')};
display: flex;
align-items: center;
justify-content: space-between;
`