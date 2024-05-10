import { Button } from '@chakra-ui/react';
import useForm from '@hooks/useForm';
import { useAppDispatch, useAppSelector } from '@store/create-store';
import { createSite, editSite } from '@store/site/action';
import { siteSelector } from '@store/site/selectors';
import {
    siteCreateValidationSchema,
    siteCreateValidationSchemaTypes,
} from 'common/validation/site';
import { FormProvider } from 'react-hook-form';

const SiteForm = () => {
    const dispatch = useAppDispatch();
    const { site, isSiteLoading } = useAppSelector(siteSelector);

    const methods = useForm<siteCreateValidationSchemaTypes>({
        validationSchema: siteCreateValidationSchema,
        defaultValues: {
            hours: site.hours || '',
            address: site.address || '',
            phone: site.phone || '',
            email: site.email || '',
        },
    });

    const { TextField, formState, handleSubmit } = methods;

    const formSubmitHandler = (data: siteCreateValidationSchemaTypes) => {
        if (site.id) {
            dispatch(editSite({ id: site.id, site: data }));
        } else {
            dispatch(createSite({ site: data }));
        }
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(formSubmitHandler)}>
                <TextField label="Address" name="address" />
                <TextField label="Email" name="email" />
                <TextField label="Phone" name="phone" />
                <TextField label="Hours" name="hours" />
                <Button
                    isDisabled={!(formState.isDirty && formState.isValid)}
                    isLoading={isSiteLoading}
                    type="submit"
                    variant="primary"
                >
                    edit site
                </Button>
            </form>
        </FormProvider>
    );
};

export default SiteForm;
