import { Formik, FormikProps, Field } from 'formik';
import {
  Box,
  Heading,
  Text,
  ChakraProps,
  Button,
  Divider,
  useToast,
} from '@chakra-ui/react';
import { ItemFragment, useItemUpdateMutation } from './Item.query';
import { useEffect, useState } from 'react';
import { InlineFormik } from './InlineFormik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { ItemUpdateInputWithCategory } from '../.generated/graphql/schema';

type EditableItemProps = Exclude<ItemFragment, 'id' | 'category' | 'attachments' | 'itemMovements'>;

export interface ItemProps extends ChakraProps {
  item: ItemFragment | Partial<Exclude<ItemFragment, 'id'>>
}

const ItemSchema = Yup.object().shape({
  name: Yup.string().required().min(2).max(100),
});

function ItemEditor({ handleSubmit, touched, id, values, setTouched }: FormikProps<EditableItemProps> & { id?: Nullable<string> }) {
  const [isLoading, setIsLoading] = useState(false);
  const anyTouched = Object.values(touched).reduce((a, b) => a || b, false);
  const toast = useToast();

  return (
    <form
      onSubmit={async (e) => {
        setIsLoading(true);
        try {
          await handleSubmit(e);
          setTouched({});
          toast({ status: 'success', title: `${values.name} saved`});
        } catch (ex) {
          toast({ status: 'error', title: `Could not save ${values.name}`, description: (ex as Error).toString()})
        }
        setIsLoading(false);
      }}
    >
      <Heading as="h2" fontSize="lg" fontWeight="bold">
        <InlineFormik name="name" />
      </Heading>
      <Text fontSize="xs" color="gray.500">{id || 'new'}</Text>
      <Divider mt={2} mb={2} />
      <Text fontSize="sm" mb={2}><InlineFormik label="Description" name="description" /></Text>
      <Text fontSize="sm" mb={2}><InlineFormik label="Brand" name="brand" /></Text>
      <Text fontSize="sm" mb={2}><InlineFormik label="Model" name="model" /></Text>
      <Text fontSize="sm" mb={2}><InlineFormik label="Serial" name="serial" /></Text>
      {anyTouched && <Button isLoading={isLoading} size="sm" type="submit">{id ? 'Save' : 'Create'}</Button>}
    </form>
  );
}

export function Item({ item: initialItem, ...props }: ItemProps) {
  const { __typename, id: presetId, tags, category, attachments, itemMovements, ...editableInitialItem } = initialItem;
  const [id, setId] = useState(presetId);
  const [item, setItem] = useState(editableInitialItem);

  // TODO(@tylermenezes) move this all into the item editor
  // TODO(@tylermenezes) whitelist allowed editable fields
  const [update, { data: updateItemData }] = useItemUpdateMutation();
  useEffect(
    () => { if (updateItemData?.itemUpdate) setItem(updateItemData?.itemUpdate) },
    [updateItemData?.itemUpdate]
  );

  const onSubmit = async (values: EditableItemProps) => {
    const setValues = Object.keys(values).reduce((accum, k) => ({ ...accum, [k]: { set: values[k as keyof typeof values] } }), {});
    if (id) await update({ variables: { id, data: setValues as unknown as ItemUpdateInputWithCategory } })
  }

  return (
    <Box p={4} borderWidth={1} rounded="sm" w="sm" {...props}>
      <Formik
        initialValues={item as EditableItemProps}
        onSubmit={onSubmit}
        validationSchema={ItemSchema}
        validateOnBlur={true}
      >
        {(formikProps) => <ItemEditor id={id} {...formikProps} />}
      </Formik>
    </Box>
  );
}
