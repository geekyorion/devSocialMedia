import React, { useState } from 'react';
import PropTypes from 'prop-types';

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';

const CreateProfileForm = ({
    handleSubmit,
    formData,
    handleOnChange,
    errors,
    formType,
    disableButton,
}) => {
    const [displaySocial, setDisplaySocial] = useState(false);

    const selectOptions = [
        { value: '', label: '* Select Professional Status' },
        { value: 'Developer', label: 'Developer' },
        { value: 'Junior Developer', label: 'Junior Developer' },
        { value: 'Senior Developer', label: 'Senior Developer' },
        { value: 'Manager', label: 'Manager' },
        { value: 'Student or Learning', label: 'Student or Learning' },
        { value: 'Instructor', label: 'Instructor or Teacher' },
        { value: 'Intern', label: 'Intern' },
        { value: 'Other', label: 'Other' }
    ];

    return (
        <form onSubmit={handleSubmit}>
            <TextFieldGroup
                placeholder="* Profile Handle"
                name="handle"
                value={formData.handle}
                onChange={handleOnChange}
                error={errors.handle}
                info="A unique handle for your profile URL"
                handleStateObject
            />

            <SelectListGroup
                name="status"
                value={formData.status}
                onChange={handleOnChange}
                options={selectOptions}
                error={errors.status}
                info="Give us an idea of where you are at in your career"
                handleStateObject
            />

            <TextFieldGroup
                name="company"
                placeholder="Company"
                value={formData.company}
                onChange={handleOnChange}
                error={errors.company}
                info="Could be your own company or one you work for"
                handleStateObject
            />

            <TextFieldGroup
                name="website"
                placeholder="Website"
                value={formData.website}
                onChange={handleOnChange}
                error={errors.website}
                info="Could be your own or a company website"
                handleStateObject
            />

            <TextFieldGroup
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleOnChange}
                error={errors.location}
                info="City & state suggested (eg. Boston, MA)"
                handleStateObject
            />

            <TextFieldGroup
                name="skills"
                placeholder="* Skills"
                value={formData.skills}
                onChange={handleOnChange}
                error={errors.skills}
                info="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
                handleStateObject
            />

            <TextFieldGroup
                name="githubUsername"
                placeholder="Github Username"
                value={formData.githubUsername}
                onChange={handleOnChange}
                error={errors.githubUsername}
                info="If you want your latest repos and a Github link, include your username"
                handleStateObject
            />

            <TextAreaFieldGroup
                name="bio"
                placeholder="A short bio of yourself"
                value={formData.bio}
                onChange={handleOnChange}
                error={errors.bio}
                info="Tell us a little about yourself"
                handleStateObject
            />

            <div className="mb-3">
                <button
                    type="button"
                    className="btn btn-dark btn-sm"
                    onClick={() => setDisplaySocial(!displaySocial)}
                >
                    {formType} Social Network Links
                </button>
                {formType === 'Add' && (<span className="text-muted"> Optional</span>)}
            </div>

            {displaySocial ? (
                <>
                    <InputGroup
                        name="twitter"
                        placeholder="Twitter Profile URL"
                        icon="twitter"
                        onChange={handleOnChange}
                        value={formData.twitter}
                        error={errors.twitter}
                        handleStateObject
                    />

                    <InputGroup
                        name="facebook"
                        placeholder="Facebook Page URL"
                        icon="facebook"
                        onChange={handleOnChange}
                        value={formData.facebook}
                        error={errors.facebook}
                        handleStateObject
                    />

                    <InputGroup
                        name="linkedin"
                        placeholder="Linkedin Profile URL"
                        icon="linkedin"
                        onChange={handleOnChange}
                        value={formData.linkedin}
                        error={errors.linkedin}
                        handleStateObject
                    />

                    <InputGroup
                        name="youtube"
                        placeholder="YouTube Channel URL"
                        icon="youtube"
                        onChange={handleOnChange}
                        value={formData.youtube}
                        error={errors.youtube}
                        handleStateObject
                    />

                    <InputGroup
                        name="instagram"
                        placeholder="Instagram Page URL"
                        icon="instagram"
                        onChange={handleOnChange}
                        value={formData.instagram}
                        error={errors.instagram}
                        handleStateObject
                    />
                </>
            ) : (
                    <></>
                )
            }
            <input
                type="submit"
                className="btn btn-info btn-block mt-4 mb-4"
                value={`${formType === 'Add' ? 'Create' : 'Update'} Profile`}
                disabled={disableButton}
            />
        </form>
    );
}

CreateProfileForm.propTypes = {
    disableButton: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    formData: PropTypes.object.isRequired,
    formType: PropTypes.string,
    handleOnChange: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
};

CreateProfileForm.defaultProps = {
    errors: {},
    formType: 'Add',
    disableButton: false,
};

export default CreateProfileForm;
