import { useState } from 'react';

import style from './style.module.css'
import { ChakraProvider, Flex, Center, Spacer, Image, Box } from '@chakra-ui/react';
import { CheckIcon, AddIcon, CloseIcon } from '@chakra-ui/icons'

function ColorBoxTwo({ changeFonColor, changeFonImage }) {
  const colorData = ['#4299E1', '#F56565', '#ECC94B', '#48BB78', '#9F7AEA']
  const imgData = [
    '/img/pattern-squares-aspire.png',
    '/img/pattern-hand-drawn-grid.png',
    '/img/pattern_strip.png',
    '/img/pattern-bind-to-grid.png',
    './img/pattern-trap-incline.png',
    ,
  ]
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);

  return (
    <>
      <ChakraProvider>
        <Flex flexWrap={'wrap'} justifyContent='center'>
          {/* <div className={style.color_wrap}> */}

          {colorData.map((color, ind) => (

            <Center className={style.checkbox_block_color}
              bg={color} >
              <input
                className={style.input_none}
                type={'checkbox'}
                value={colorData[ind]}
                onClick={(e) => { setSelectedCheckbox(`checkbox${ind}`); changeFonColor(e) }} />
              {selectedCheckbox === `{checkbox${ind}}` &&
                <CheckIcon className={style.icon_check} />
              }
            </Center>

          ))}

          {/* Поле Убрать цвет */}
          <Center className={style.checkbox_block_color}>
            <input
              className={style.input_none}
              type={'checkbox'}
              value={'#ffffff'}
              onClick={(e) => { setSelectedCheckbox(`checkbox${colorData.length + 1}`); changeFonColor(e) }} />
            <CloseIcon className={style.icon} />
          </Center>

          {/* Поле Добавить цвет */}
          <Center className={style.checkbox_block_color}
          >
            <input
              className={style.input_none}
              type={'color'}
              onChange={(e) => { setSelectedCheckbox('checkbox7'); changeFonColor(e) }} />
            <AddIcon className={style.icon} />
          </Center>
          {/* </div> */}
        </Flex>

        {/* Блок с картинками */}
        <Flex>
          <div className={style.color_wrap}>
            {imgData.map((image, ind) => (
              <Center className={style.checkbox_block_img}
                w='20%'
                bgImage={`url(${image})`}
              >
                <input
                  className={style.input_none}
                  type={'checkbox'}
                  value={image}
                  onClick={(e) => { setSelectedCheckbox(`checkbox${ind + colorData.length + 2}`); changeFonImage(e) }} />
                {selectedCheckbox === `checkbox${ind + colorData.length + 2}` &&
                  <CheckIcon
                    color={'#1f2020'}
                    w={'50%'}
                    h={'50%'}
                    position={'absolute'} />
                }
              </Center>
            ))}
          </div>
        </Flex>
      </ChakraProvider>
    </>
  );
}

export default ColorBoxTwo;