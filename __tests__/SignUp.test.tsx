import Notification from '@components/Notification';
import { AUTH_API } from '@constant/api';
import { DEFAULT_VALIDATION_ERRORS } from '@constant/error';
import { AUTH_ROUTES } from '@constant/route';
import SignUpModule from '@module/auth/signUp';
import SocialSignInButtons from '@module/auth/socialSignInButtons';
import SwitchSignUpSignIn from '@module/auth/switchTo';
import { signUp } from '@store/auth/action';
import { createServer } from '@test/server';
import { screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { render, store } from '@utils/test';
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import React from 'react';

const renderComponent = async (children: React.ReactNode) => {
    render(<MemoryRouterProvider>{children}</MemoryRouterProvider>);
};

describe('Render Sign up module', () => {
    it('Should render all 4 input fields and submit button.', () => {
        const onSubmit = jest.fn();
        renderComponent(<SignUpModule isLoading={false} onSubmit={onSubmit} />);
        const textInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password');
        const firstName = screen.getByLabelText('First Name');
        const lastName = screen.getByLabelText('Last Name');

        expect(textInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(firstName).toBeInTheDocument();
        expect(lastName).toBeInTheDocument();

        const submitButton = screen.getByRole('button', {
            name: 'sign up',
        });

        expect(submitButton).toBeInTheDocument();
    });

    it('Should display error messages for invalid inputs', async () => {
        const onSubmit = jest.fn();
        renderComponent(<SignUpModule isLoading={false} onSubmit={onSubmit} />);

        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password');

        const invalidEmail = DEFAULT_VALIDATION_ERRORS.email;
        const invalidPassword = DEFAULT_VALIDATION_ERRORS.pattern_password;

        await waitFor(async () => {
            await user.type(emailInput, 'email');
            await user.type(passwordInput, 'password');
        });

        const submitButton = screen.getByRole('button', {
            name: 'sign up',
        });

        await waitFor(async () => {
            await user.click(submitButton);
        });

        expect(screen.getByText(invalidEmail)).toBeInTheDocument();
        expect(screen.getByText(invalidPassword)).toBeInTheDocument();
    });

    it('Should display required error message when inputs are empty', async () => {
        const onSubmit = jest.fn();
        renderComponent(<SignUpModule isLoading={false} onSubmit={onSubmit} />);

        const submitButton = screen.getByRole('button', {
            name: 'sign up',
        });
        await waitFor(async () => {
            await user.click(submitButton);
        });

        const errorMessageText = screen.getAllByText(
            DEFAULT_VALIDATION_ERRORS.required
        );
        expect(errorMessageText).toHaveLength(4);
    });

    it('Should render navigation link', async () => {
        const text = 'Already sign up';
        const redirectLink = AUTH_ROUTES.SIGN_IN;
        const redirectToText = 'Sign in';

        renderComponent(
            <SwitchSignUpSignIn
                redirectLink={redirectLink}
                redirectToText={redirectToText}
                text={text}
            />
        );

        const switchText = screen.getByText(text);
        expect(switchText).toBeInTheDocument();

        const linkElement = screen.getByRole('link', {
            name: redirectToText,
        });
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute('href', redirectLink);
    });

    it('Should navigate when link is clicked', async () => {
        const text = 'Already sign up';
        const redirectLink = AUTH_ROUTES.BASE;
        const redirectToText = 'Sign in';
        renderComponent(
            <SwitchSignUpSignIn
                redirectLink={redirectLink}
                redirectToText={redirectToText}
                text={text}
            />
        );

        const linkElement = screen.getByRole('link', { name: redirectToText });
        await waitFor(async () => {
            await user.click(linkElement);
        });
        expect(mockRouter.asPath).toEqual(redirectLink);
    });

    it('Should render sign in google button', () => {
        renderComponent(<SocialSignInButtons />);
        const googleButton = screen.getByText('sign in with google');
        expect(googleButton).toBeInTheDocument();
    });
});

describe('Successfully sign up.', () => {
    createServer([
        {
            method: 'post',
            path: `${AUTH_API.SIGN_UP}`,
            res: () => ({ url: 'http://localhost:3000/auth/signIn' }),
        },
    ]);

    test('Should redirect to shop page', async () => {
        const email = 'test@example.com';
        const password = 'password123nN@';
        const firstname = 'firstname';
        const lastname = 'lastname';

        const action = signUp({ email, password, lastName: '', firstName: '' });
        const onSubmit = () => store.dispatch(action);

        renderComponent(
            <>
                <SignUpModule isLoading={false} onSubmit={onSubmit} />
                <Notification />
            </>
        );

        const firstNameInput = screen.getByLabelText('First Name');
        const lastNameInput = screen.getByLabelText('Last Name');
        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password');

        await waitFor(async () => {
            await user.type(emailInput, email);
            await user.type(passwordInput, password);
            await user.type(firstNameInput, firstname);
            await user.type(lastNameInput, lastname);
        });

        const submitButton = screen.getByRole('button', {
            name: 'sign up',
        });

        await waitFor(async () => {
            await user.click(submitButton);
        });

        const signUpSuccess =
            'A verification link has been sent to your email. Please check your inbox to verify your account.';

        const notificationMessage = await screen.findByText(signUpSuccess);
        expect(notificationMessage).toBeInTheDocument();
    });
});
