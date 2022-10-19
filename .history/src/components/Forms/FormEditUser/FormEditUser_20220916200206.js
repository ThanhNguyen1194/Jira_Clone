import { Editor } from '@tinymce/tinymce-react'
import { withFormik } from 'formik';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { connect } from 'react-redux';
import * as Yup from 'yup';

function FormEditUser() {
    const arrProjectCategory = useSelector(state => state.ProjectCategoryReducer.arrProjectCategory);
    const dispatch = useDispatch();


    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setValues,
        setFieldValue
    } = props;
  return (
    <form className="container-fuild" onSubmit={handleSubmit}>
    <div className="row">
        <div className="col-4">

            <div className="form-group">
                <p className="font-weight-bold">Project id</p>
                <input value={values.id} disabled className="form-control" name="id" />
            </div>


        </div>
        <div className="col-4">
            <div className="form-group">
                <p className="font-weight-bold">Project name</p>
                <input value={values.projectName} className="form-control" name="projectName" onChange={handleChange} />
            </div>
        </div>
        <div className="col-4">
            <div className="form-group">
                <p className="font-weight-bold">Project Category</p>
                <select className="form-control" name="categoryId" value={values.categoryId}>
                    {arrProjectCategory?.map((item, index) => {
                        return <option key={index} value={item.id}>
                            {item.projectCategoryName}
                        </option>
                    })}
                </select>


            </div>
        </div>
        
    </div>
</form >
  )
}

const EditProjectForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const { projectEdit } = props;

        return {
            id: projectEdit?.id,
            projectName: projectEdit.projectName,
            description: projectEdit.description,
            categoryId: projectEdit.categoryId
        }
    },
    validationSchema: Yup.object().shape({


    }),
    handleSubmit: (values, { props, setSubmitting }) => {

        //Khi người dùng bấm submit => đưa dữ liệu về backedn thông qua api
        // const action = {
        //     type:'UPDATE_PROJECT_SAGA',
        //     prjectUpdate:values
        // }
        //Gọi saga
        props.dispatch({
            type:'UPDATE_PROJECT_SAGA',
            prjectUpdate:values
        })

    },
    displayName: 'EditProjectForm',
})(FormEditProject);

const mapStateToProps = (state) => ({

    projectEdit: state.ProjectReducer.projectEdit

})



export default connect(mapStateToProps)(EditProjectForm);