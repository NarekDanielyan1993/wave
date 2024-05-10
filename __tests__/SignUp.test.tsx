import Notification from '@components/Notification';
import { AUTH_API } from '@constant/api';
import { DEFAULT_VALIDATION_ERRORS } from '@constant/error';
import { AUTH_ROUTES } from '@constant/route';
import SignInModule from '@module/auth/signIn';
import SignUpModule from '@module/auth/signUp';
import SocialSignInButtons from '@module/auth/socialSignInButtons';
import SwitchSignUpSignIn from '@module/auth/switchTo';
import { signUp } from '@store/auth/action';
import { createServer } from '@test/server';
import { screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { render, store } from '@utils/test';
import mockRouter from 'next-router-mock';

describe('Render Sign in module', () => {
    it('Should have two inputs and submit button', () => {
        const onSubmit = jest.fn();
        render(<SignInModule isLoading={false} onSubmit={onSubmit} />);
        const textInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password');
        expect(textInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        const submitButton = screen.getByTestId('sign-in-button');
        expect(submitButton).toBeInTheDocument();
    });

    it('Should display error messages for invalid inputs', async () => {
        const onSubmit = jest.fn();
        render(<SignInModule isLoading={false} onSubmit={onSubmit} />);

        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password');

        const invalidEmail = DEFAULT_VALIDATION_ERRORS.email;
        const invalidPassword = DEFAULT_VALIDATION_ERRORS.pattern_password;

        await user.click(emailInput);
        await user.keyboard('email');
        await user.click(passwordInput);
        await user.keyboard('password');

        const submitButton = screen.getByTestId('sign-in-button');
        await user.click(submitButton);
        expect(await screen.findByText(invalidEmail)).toBeInTheDocument();
        expect(await screen.findByText(invalidPassword)).toBeInTheDocument();
    });

    it('Should display required error message when inputs are empty', async () => {
        const onSubmit = jest.fn();
        render(<SignInModule isLoading={false} onSubmit={onSubmit} />);

        const submitButton = screen.getByTestId('sign-in-button');
        await user.click(submitButton);

        await waitFor(() => {
            const errorMessageText = screen.getAllByText(
                DEFAULT_VALIDATION_ERRORS.required
            );
            expect(errorMessageText).toHaveLength(2);
        });
    });

    it('Should render navigation link', () => {
        const text = 'Not registered yet';
        const redirectLink = AUTH_ROUTES.SIGN_UP;
        const redirectToText = 'Sign up';
        render(
            <SwitchSignUpSignIn
                redirectLink={redirectLink}
                redirectToText={redirectToText}
                text={text}
            />
        );

        const switchText = screen.getByText(text);
        expect(switchText).toBeInTheDocument();

        const linkElement = screen.getByRole('link', { name: redirectToText });
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute('href', redirectLink);
    });

    it('Should navigate when link is clicked', async () => {
        const text = 'Not registered yet';
        const redirectLink = AUTH_ROUTES.BASE;
        const redirectToText = 'Sign up';
        render(
            <SwitchSignUpSignIn
                redirectLink={redirectLink}
                redirectToText={redirectToText}
                text={text}
            />
        );

        const linkElement = screen.getByRole('link', { name: redirectToText });
        await user.click(linkElement);
        expect(mockRouter.asPath).toEqual(redirectLink);
    });

    it('Should render sign in google button', () => {
        render(<SocialSignInButtons />);
        const googleButton = screen.getByText('sign in with google');
        expect(googleButton).toBeInTheDocument();
    });
});

describe.only('Successfully sign in.', () => {
    const signIn: jest.Mock = jest.fn();
    jest.mock('next-auth/react', () => ({
        signIn,
    }));
    jest.mock('next/router');

    createServer([
        {
            method: 'post',
            path: `${AUTH_API.SIGN_UP}`,
            res: () => {
                console.log(45454);
                return { url: 'http://localhost:3000/auth/signIn' };
            },
        },
    ]);

    test('Should redirect to shop page', async () => {
        const email = 'test@example.com';
        const password = 'password123nN@';
        const firstname = 'firstname';
        const lastname = 'lastname';

        const action = signUp({ email, password, lastName: '', firstName: '' });
        const onSubmit = () => store.dispatch(action);

        render(
            <>
                <SignUpModule isLoading={false} onSubmit={onSubmit} />
                <Notification />
            </>
        );

        const firstNameInput = screen.getByLabelText('First Name');
        const lastNameInput = screen.getByLabelText('Last Name');
        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password');

        await user.type(emailInput, email);
        await user.type(passwordInput, password);
        await user.type(firstNameInput, firstname);
        await user.type(lastNameInput, lastname);

        const submitButton = screen.getByTestId('sign-up-button');
        await user.click(submitButton);

        const signUpSuccess =
            'A verification link has been sent to your email. Please check your inbox to verify your account.';

        const notificationMessage = await screen.findByText(signUpSuccess);
        expect(notificationMessage).toBeInTheDocument();
    });
});
