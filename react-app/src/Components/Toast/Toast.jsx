import React from 'react'
import { useToast } from '@chakra-ui/react'

import { ChakraProvider, Button, Box, Input } from '@chakra-ui/react';

function Toast() {
  const toast = useToast()
  return (

    toast({
      position: 'top',
      duration: 1000,
      render: () => (
        <Box color='white' p={3} bg='blue.500' mt="200px">
          Hello World
        </Box>
      ),
    })

  )
}
// function Toast() {
//   const toast = useToast()
//   return (
//     <Button
//       onClick={() =>
//         toast({
//           position: 'top',
//           duration: 1000,
//           render: () => (
//             <Box color='white' p={3} bg='blue.500' mt="200px">
//               Hello World
//             </Box>
//           ),
//         })
//       }
//     >
//       Show Toast
//     </Button>
//   )
// }