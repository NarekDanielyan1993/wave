import { Flex } from '@chakra-ui/react';
import { SHOP_ROUTE } from '@constant/route';
import { config } from '@utils/config';
import { signIn } from 'next-auth/react';
import GoogleIcon from 'public/google.svg';
import {
    ISocialSignInButtons,
    SocialSignInProvidersTypes,
} from 'types/client/auth';
import { StyledGoogleButton } from './style';
const SocialSignInButtons = () => {
    const socialSignInHandler = async (type: SocialSignInProvidersTypes) => {
        const res = await signIn(type, {
            redirect: false,
            callbackUrl: `${config.NEXT_PUBLIC_BASE_URL}${SHOP_ROUTE}`,
        });
        console.log(res);
    };

    const socialButtonsData: ISocialSignInButtons[] = [
        {
            Component: StyledGoogleButton,
            id: 1,
            onClick: () => socialSignInHandler('google'),
            Icon: GoogleIcon,
            text: 'sign in with google',
        },
    ];
    return (
        <Flex justifyContent="center">
            {socialButtonsData.map(({ Icon, Component, ...btn }) => (
                <Component
                    key={btn.id}
                    leftIcon={<Icon />}
                    onClick={btn.onClick}
                    w="full"
                >
                    {btn.text}
                </Component>
            ))}
        </Flex>
    );
};

export default SocialSignInButtons;
