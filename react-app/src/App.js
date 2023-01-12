import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'

import React from 'react';
import Auth from './components/Auth/Auth';
import Board from './components/Board/Board'

function App() {
  const userName = useSelector(store => store.userName);
  console.log(userName)
  return (
    <div className="App">
      {/* <Routes>
        <Route path='/auth' element={<Auth />}/>
      </Routes> */}
      {
        userName ?
          <ChakraProvider>
            <Board />
          </ChakraProvider>
          : <Auth />
      }

    </div >


  );
}

export default App;

// const [modal, setModal] = useState(false);
//   const [comments, setComments] = useState([
//     { id: 1, login: 'Андей', comment: 'Привет' },
//     { id: 2, login: 'Василий', comment: 'Привет!' },
//     { id: 3, login: 'Петрович', comment: 'Не мешайте' },
//     { id: 4, login: 'Иваныч', comment: 'Где бутылка, Петрович? ' },
//   ])

//   function onCreateComment(comment) {
//     const newComment = {
//       id: comments.length + 1,
//       login: 'Петруля',
//       comment,
//     }
//     setComments([newComment, ...comments]);
//   }

//   return (
//     <div className="App">
//       <ChakraProvider>
//         <Button m={4} colorScheme="blue" onClick={() => setModal(true)}>Карточка</Button>
//         <MyModal visible={modal} setVisible={setModal}>
//           <TaskForm comments={comments} onCreateComment={onCreateComment} />
//         </MyModal>
//       </ChakraProvider>
//     </div >

//   );
