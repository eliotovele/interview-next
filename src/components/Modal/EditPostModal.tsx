import { api } from '@/services/api';
import { PostProps } from '@/types/post';
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Icon,
  useToast,
} from '@chakra-ui/react';
import { FormEvent, useRef, useState } from 'react';
import { MdEdit } from 'react-icons/md';

type EditPostModalProps = {
  post: PostProps;
};
export function EditPostModal({ post }: EditPostModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);

  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const toast = useToast();

  async function handlePostEdit(event: FormEvent) {
    event.preventDefault();
    try {
      await api.patch(`/posts/${post.id}`);
      toast({
        title: 'Post updated.',
        description: 'Post successfully updated',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      onClose();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Icon onClick={onOpen} color='blue.600' cursor='pointer' as={MdEdit} />

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handlePostEdit}>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>First name</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder='Title'
                  value={title}
                  onChange={event => setTitle(event.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>First name</FormLabel>
                <Input
                  ref={initialRef}
                  value={body}
                  placeholder='Body'
                  onChange={event => setBody(event.target.value)}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type='submit' colorScheme='blue' mr={3}>
                Update
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
