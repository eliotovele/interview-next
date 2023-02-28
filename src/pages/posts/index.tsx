/* eslint-disable react-hooks/exhaustive-deps */
import { EditPostModal } from '@/components/Modal/EditPostModal';
import { Pagination } from '@/components/Pagination';
import { api } from '@/services/api';
import { PostProps } from '@/types/post';
import {
  Box,
  Flex,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  List,
  ListItem,
  useToast
} from '@chakra-ui/react';
import { ChangeEvent, useEffect, useState } from 'react';
import { MdDelete, MdSearch } from 'react-icons/md';

export default function Posts() {
  const [posts, setPosts] = useState<PostProps[]>();
  const [totalCount, setTotalCount] = useState<number>();
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState<string>('');

  const toast = useToast();

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    setSearchText(event.target.value);
  }

  async function getPosts() {
    try {
      const response = await api.get('/posts', {
        params: {
          _page: page,
          _limit: 25,
          q: searchText,
        },
      });
      setTotalCount(response.headers['x-total-count']);
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handlePostDelete(id: number) {
    await api.delete(`/posts/${id}`).then(() => {});
    toast({
      title: 'Post deleted.',
      description: 'Post successfully deleted',
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'top-right',
    });
  }

  useEffect(() => {
    getPosts();
  }, [searchText, page]);

  return (
    <Flex
      marginX='auto'
      maxWidth='4xl'
      paddingTop='10'
      css={{ height: '100vh' }}
      flexDirection='column'
    >
      <Box width='full' marginBottom='5'>
        <InputGroup>
          <InputLeftElement pointerEvents='none'>
            <MdSearch color='gray.300' />
          </InputLeftElement>
          <Input
            type='text'
            placeholder='Search here'
            onChange={event => handleSearch(event)}
          />
        </InputGroup>
      </Box>

      <List textAlign='left' spacing={3}>
        {posts?.map(post => (
          <ListItem display='flex' justifyContent='space-between' key={post.id}>
            {post.title}
            <HStack spacing='3'>
              <EditPostModal post={post}/>

              <Icon
                color='red.600'
                cursor='pointer'
                as={MdDelete}
                onClick={() => handlePostDelete(post.id)}
              />
            </HStack>
          </ListItem>
        ))}
        <Pagination
          totalCountOfRegisters={totalCount!}
          currentPage={page}
          onPageChange={setPage}
        />
      </List>
    </Flex>
  );
}
