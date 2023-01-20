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
        <Flex>
          <div className={style.color_wrap}>

            <Center className={style.checkbox_block}
              bg={colorData[0]} >
              <input
                className={style.input_none}
                type={'checkbox'}
                value={colorData[0]}
                onClick={(e) => { setSelectedCheckbox('checkbox1'); changeFonColor(e) }} />
              {selectedCheckbox === 'checkbox1' &&
                <CheckIcon className={style.icon_check} />
              }
            </Center>
            <Spacer />

            {/* Поле  2 */}
            <Center className={style.checkbox_block}
              bg={colorData[1]}>
              <input
                className={style.input_none}
                type={'checkbox'}
                value={colorData[1]}
                onClick={(e) => { setSelectedCheckbox('checkbox2'); changeFonColor(e) }} />
              {selectedCheckbox === 'checkbox2' &&
                <CheckIcon className={style.icon_check} />}
            </Center>
            <Spacer />

            {/* Поле  3 */}
            <Center className={style.checkbox_block}
              bg={colorData[2]}>
              <input
                className={style.input_none}
                type={'checkbox'}
                value={colorData[2]}
                onClick={(e) => { setSelectedCheckbox('checkbox3'); changeFonColor(e) }} />
              {selectedCheckbox === 'checkbox3' &&
                <CheckIcon className={style.icon_check} />}
            </Center>
            <Spacer />

            {/* Поле  4 */}
            <Center className={style.checkbox_block}
              bg={colorData[3]}>
              <input
                className={style.input_none}
                type={'checkbox'}
                value={colorData[3]}
                onClick={(e) => { setSelectedCheckbox('checkbox4'); changeFonColor(e) }} />
              {selectedCheckbox === 'checkbox4' &&
                <CheckIcon className={style.icon_check} />}
            </Center>
            <Spacer />

            {/* Поле  5 */}
            <Center className={style.checkbox_block}
              bg={colorData[4]}>
              <input
                className={style.input_none}
                type={'checkbox'}
                value={colorData[4]}
                onClick={(e) => { setSelectedCheckbox('checkbox5'); changeFonColor(e) }} />
              {selectedCheckbox === 'checkbox5' &&
                <CheckIcon className={style.icon_check} />}
            </Center>
            <Spacer />

            {/* Поле Убрать цвет */}
            <Center className={style.checkbox_block}>
              <input
                className={style.input_none}
                type={'checkbox'}
                value={'#ffffff'}
                onClick={(e) => { setSelectedCheckbox('checkbox6'); changeFonColor(e) }} />
              <CloseIcon className={style.icon} />
            </Center>
            <Spacer />

            {/* Поле Добавить цвет */}
            <Center className={style.checkbox_block}
            >
              <input
                className={style.input_none}
                type={'color'}
                onChange={(e) => { setSelectedCheckbox('checkbox7'); changeFonColor(e) }} />
              <AddIcon className={style.icon} />
            </Center>
            <Spacer />
          </div>
        </Flex>

        {/* Блок с картинками */}
        <Flex>
          {/* Блок с картинками 1 */}
          <Center className={style.checkbox_block_img}
            w='20%'
            bgImage={`url(${imgData[0]})`}
          >
            <input
              className={style.input_none}
              type={'checkbox'}
              value={imgData[0]}
              onClick={(e) => { setSelectedCheckbox('checkbox8'); changeFonImage(e) }} />
            {selectedCheckbox === 'checkbox8' &&
              <CheckIcon
                color={'#EDF2F7'}
                w={'50%'}
                h={'50%'}
                position={'absolute'} />
            }
          </Center>
          <Spacer />

          {/* Блок с картинками 2 */}
          <Center className={style.checkbox_block_img}
            w='20%'
            bgImage={`url(${imgData[1]})`}
          >
            <input
              className={style.input_none}
              type={'checkbox'}
              value={imgData[1]}
              onClick={(e) => { setSelectedCheckbox('checkbox9'); changeFonImage(e) }} />
            {selectedCheckbox === 'checkbox9' &&
              <CheckIcon
                color={'#EDF2F7'}
                w={'50%'}
                h={'50%'}
                position={'absolute'} />
            }
          </Center>
          <Spacer />

          {/* Блок с картинками 3 */}
          <Center className={style.checkbox_block_img}
            w='20%'
            bgImage={`url(${imgData[2]})`}
          >
            <input
              className={style.input_none}
              type={'checkbox'}
              value={imgData[2]}
              onClick={(e) => { setSelectedCheckbox('checkbox10'); changeFonImage(e) }} />
            {selectedCheckbox === 'checkbox10' &&
              <CheckIcon
                color={'#EDF2F7'}
                w={'50%'}
                h={'50%'}
                position={'absolute'} />
            }
          </Center>
          <Spacer />
          {/* Блок с картинками 4 */}
          <Center className={style.checkbox_block_img}
            w='20%'
            bgImage={`url(${imgData[3]})`}
          >
            <input
              className={style.input_none}
              type={'checkbox'}
              value={imgData[3]}
              onClick={(e) => { setSelectedCheckbox('checkbox11'); changeFonImage(e) }} />
            {selectedCheckbox === 'checkbox11' &&
              <CheckIcon
                color={'#EDF2F7'}
                w={'50%'}
                h={'50%'}
                position={'absolute'} />
            }
          </Center>
          <Spacer />

          {/* Блок с картинками 5 */}
          <Center className={style.checkbox_block_img}
            w='20%'
            bgImage={`url(${imgData[4]})`}
          >
            <input
              className={style.input_none}
              type={'checkbox'}
              value={imgData[4]}
              onClick={(e) => { setSelectedCheckbox('checkbox12'); changeFonImage(e) }} />
            {selectedCheckbox === 'checkbox12' &&
              <CheckIcon
                color={'#EDF2F7'}
                w={'50%'}
                h={'50%'}
                position={'absolute'} />
            }
          </Center>
          <Spacer />
        </Flex>
      </ChakraProvider>
    </>
  );
}

export default ColorBoxTwo;