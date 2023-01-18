
import { useState, useEffect, useRef } from 'react';

import style from './style.module.css'
import { ChakraProvider, Checkbox, Input, Box, IconButton, CheckboxGroup, Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { AddIcon, WarningIcon } from '@chakra-ui/icons'


function ColorBox({ changeColor }) {
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);

  console.log("▶ ⇛ selectedCheckbox", selectedCheckbox);

  const refContainer = useRef();

  function clickSetColor(e) {
    const inputElement = e.target.children[0]
    console.log("▶ ⇛ refContainer", refContainer.current);
    refContainer.current.click()

  }


  return (
    <>
      {/* <ChakraProvider> */}
      <div className={style.color_wrap}>
        <Checkbox
          bg='#4299E1'
          className={style.color_block}
          isDisabled={selectedCheckbox === 'checkbox1'}
          isChecked={selectedCheckbox === 'checkbox1'}
          onChange={(e) => { setSelectedCheckbox('checkbox1'); changeColor(e) }}
          value='#4299E1'
        >
        </Checkbox>

        <Checkbox bg='#F56565'
          className={style.color_block}
          isDisabled={selectedCheckbox === 'checkbox2'}
          isChecked={selectedCheckbox === 'checkbox2'}
          onChange={(e) => { setSelectedCheckbox('checkbox2'); changeColor(e) }}
          value='#F56565'
        >

        </Checkbox>
        <Checkbox bg='#ECC94B' className={style.color_block}
          isDisabled={selectedCheckbox === 'checkbox3'}
          isChecked={selectedCheckbox === 'checkbox3'}
          onChange={(e) => { setSelectedCheckbox('checkbox3'); changeColor(e) }}
          value='#ECC94B'
        >

        </Checkbox>
        <Checkbox bg='#48BB78' className={style.color_block}
          isDisabled={selectedCheckbox === 'checkbox4'}
          isChecked={selectedCheckbox === 'checkbox4'}
          onChange={(e) => { setSelectedCheckbox('checkbox4'); changeColor(e) }}
          value='#48BB78'
        >

        </Checkbox>
        <Checkbox
          bg='#9F7AEA' className={style.color_block}
          isDisabled={selectedCheckbox === 'checkbox5'}
          isChecked={selectedCheckbox === 'checkbox5'}
          onChange={(e) => { setSelectedCheckbox('checkbox5'); changeColor(e) }}
          value='#9F7AEA'
        >

        </Checkbox>
        {/* // checkbox Нет фона */}
        <Checkbox
          ml='0'
          className={style.color_block}
          isDisabled={selectedCheckbox === 'checkbox6'}
          isChecked={selectedCheckbox === 'checkbox6'}
          onChange={(e) => { setSelectedCheckbox('checkbox6'); changeColor(e) }}
          value='#ffffff'
        >

          <Box className={style.text} >
            Нет<br></br>
            Фона
          </Box>

        </Checkbox>
        {/* // Выбор своего цвета */}


        <Box bg={refContainer.value}
          className={style.color_block}
          onClick={(e) => clickSetColor(e)}>
          <Input
            ref={refContainer}
            id='colorInputId'
            type='color'
            className={style.color_input}
            onChange={(e) => { setSelectedCheckbox('checkbox7'); changeColor(e) }}
            defaultValue='#ffffff'
          >
          </Input>

          <Box className={style.text}>
            Ваш
            <br></br>
            Фон
          </Box>

        </Box >
      </div>
      {/* </ChakraProvider> */}
    </>
  );
}

export default ColorBox;
