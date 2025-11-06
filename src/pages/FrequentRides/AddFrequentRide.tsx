import { Formik, type FormikHelpers } from "formik";
import * as Yup from "yup";
import LoadingButton from "../../components/Form/LoadingButton";
import FormCard from "../../components/Form/FormCard";
import TextInput from "../../components/Form/TextInput";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useToast } from "../../components/Toast/ToastContext";
import apiInterceptor from "../../hooks/apiInterceptor";
import { api } from "../../hooks/api";
import { useNavigate } from "react-router";

type FormValues = {
    from: string;
    to: string;
}

const AddFrequentRide = () => {
    const initialValues: FormValues = {
        from: "",
        to: ""
    };
    const { t } = useTranslation();
    const validationSchema = Yup.object().shape({
        from: Yup.string().required(t("formMessages.fromRequired")),
        to: Yup.string().required(t("formMessages.toRequired"))
    });
    const [isLoading, setIsLoading] = useState(false);
    const { showToast } = useToast();
    const navigate = useNavigate();

    const handleCreateFrequentRide = async (payload: any) => {
        try {
            setIsLoading(true);
            await apiInterceptor.post(api.admin.createFrequentRide, payload);
            showToast("success", t("messages.frequentRideSuccess"));
            navigate("/frequent-rides");
        } catch (err) {
            console.error("Error creating frequent ride:", err);
            showToast("error", t("error.server"));
        }
        finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
        setSubmitting(false);
        const payload = { ...values };
        await handleCreateFrequentRide(payload);
    };

    const handleCancel = () => {
        navigate("/frequent-rides");
    }

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
            {({ values, handleChange, handleBlur, errors, touched, isValid, handleSubmit }) => {
                return (
                    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-5">
                        <FormCard title="Add Frequent Rides">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                                <TextInput
                                    name={"from"}
                                    label={t("from")}
                                    placeholder={t("fromLocation")}
                                    value={values.from}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors?.from && touched?.from}
                                />
                                <TextInput
                                    name={"to"}
                                    label={t("to")}
                                    placeholder={t("toLocation")}
                                    value={values.to}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors?.to && touched?.to}
                                />
                            </div>
                            <div className="flex items-center gap-6 justify-end">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="px-6 py-2 bg-gray-200 hover:cursor-pointer text-gray-700 rounded-md
                                     hover:bg-gray-300 focus:outline-none"
                                >
                                    {t("cancel")}
                                </button>
                                <LoadingButton name="Submit" handleApi={handleSubmit}
                                    disabled={!isValid} isLoading={isLoading}
                                />
                            </div>
                        </FormCard>
                    </form>
                );
            }}
        </Formik>
    )
}
export default AddFrequentRide;