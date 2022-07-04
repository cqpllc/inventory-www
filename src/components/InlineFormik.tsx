import { Formik, FormikProps, Field, useField } from 'formik';
import {
  Text,
  ChakraProps,
  Editable,
  EditableInput,
  EditablePreview,
  EditableTextarea,
  FormControl,
  FormLabel,
  useEditableControls,
  Input,
  Icon,
  Box,
} from '@chakra-ui/react';
import { IoSparkles } from 'react-icons/io5'

function EditableControls(props: ChakraProps) {
  const { isEditing, getEditButtonProps } = useEditableControls();
  if (isEditing) return null;
  return (
    <Text fontSize="xs" color="gray.500" {...props} {...getEditButtonProps()}><Icon as={IoSparkles} /> edit</Text>
  );
}

export interface InlineFormikProps extends ChakraProps {
  label?: string
  name: string
  as?: 'input' | 'textarea' | React.ComponentType | React.ForwardRefExoticComponent<any>;
}

export function InlineFormik({ name, label, as: is, ...props }: InlineFormikProps) {
  const [field, meta, helpers] = useField(name);
  const FieldType = typeof is === 'string'
    ? { input: EditableInput, textarea: EditableTextarea }[is]
    : is || EditableInput;

  return (
    <FormControl {...props}>
      <Editable value={field.value}>
        {label && (
          <FormLabel fontSize="sm" fontWeight="bold" mb={0} htmlFor={name}>{label}</FormLabel>
        )}
        {!field.value && (
          <EditableControls display="inline" />
        )}
        <EditablePreview />
        <FieldType {...field} />
      </Editable>
      {meta.error && <Text fontSize="xs" color="red.500">{meta.error}</Text>}
    </FormControl>
  );
}
