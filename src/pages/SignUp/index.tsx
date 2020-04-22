import React, { useCallback, useRef } from 'react';
import {
    FiUser,
    FiLock,
    FiMail,
    FiArrowLeft,
} from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import logoImg from '../../assets/logo.svg';

import { Container, Content, Background } from './styles';
import Input from '../../components/input';
import Button from '../../components/button';

import getvalidationErrors from '../../utils/getvalidationErrors';

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const handleSubmit = useCallback(async (data: object) => {
        formRef.current?.setErrors({});
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string()
                    .required('E-mail obrigatório')
                    .email('Digite um e-mail válido'),
                password: Yup.string().min(6, 'No mínimo 6 digitos'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });
        } catch (error) {
            formRef.current?.setErrors(getvalidationErrors(error));
            console.log(error);
        }
    }, []);

    return (
        <Container>
            <Background />

            <Content>
                <img src={logoImg} alt="GoBarber" />

                <Form
                    ref={formRef}
                    onSubmit={handleSubmit}
                >
                    <h1>Faça seu Cadastro</h1>

                    <Input icon={FiUser} name="name" placeholder="Nome" />
                    <Input icon={FiMail} name="email" placeholder="Email" />
                    <Input icon={FiLock} name="password" placeholder="Senha" type="password" />

                    <Button type="submit">Cadastrar</Button>
                </Form>

                <a href="login">
                    <FiArrowLeft />
                    Criar Conta
                </a>
            </Content>
        </Container>
    );
};

export default SignUp;