import axios from 'axios'
import React, { useEffect, useContext } from 'react'
import { Flex, Stack, Box, Text, Input, FormLabel, } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { BASE_URL } from '../../../Eviornment.config'
import FormContext from '../../../Context/formContext'
import Edit from './Edit'
import Delete from './Delete'
import NewField from './NewField'

const OneForm = () => {
    const { formId } = useParams()
    const [formState, dispatch] = useContext(FormContext);
    const getForm = async () => {
        let form = await axios.get(BASE_URL + '/getFormById/' + formId)
        console.log(form)
        if (form.status === 200) {
            dispatch({ type: 'oneForm', payload: form.data })
        }
    }
    useEffect(() => {
        getForm()
    }, [])
    return (
        <div className='CreateFormPage'>
            <Flex direction={'column'} width={'90vw'}>
                <Stack spacing={1}>
                    <Box marginY={4}>
                        <Flex alignItems={'center'}>
                            <Text fontSize='4xl'>
                                {formState.currentFormData?.name}
                            </Text>
                            <NewField getData={getForm} formid={formId} />
                        </Flex>
                    </Box>
                    {
                        formState.currentFormData?.fields.map((el, index) => {
                            return (
                                <Box key={index}>
                                    <Flex>
                                        <FormLabel style={{ textTransform: 'capitalize' }}>
                                            {el.name}
                                        </FormLabel>
                                        <Edit getData={getForm} name={el.name} formid={formId} fieldid={el._id} />
                                        <Delete formid={formId} fieldid={el._id} />
                                    </Flex>
                                    <Input
                                        placeholder={`Enter your ${el.name}`}
                                        size='md'
                                        type={el.type}
                                    />
                                </Box>
                            )
                        })
                    }
                </Stack>
            </Flex>
        </div>
    )
}

export default OneForm