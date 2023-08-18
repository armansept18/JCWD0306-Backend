import {
 Box,
 Center,
 Flex,
 Icon,
 Input,
 Select,
 Modal,
 useDisclosure,
 ModalOverlay,
 ModalContent,
 Button
} from '@chakra-ui/react';
import {
 Entertaiment,
 Food,
 Expense,
 Groceries,
 Sport,
 Transportation,
 Back,
 Trash
} from '../assets';
import moment from 'moment';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { api } from '../api/api';
export const Home = () => {
 const [total, setTotal] = useState(0);
 const [expenses, setExpenses] = useState([]);
 const [datefrom, setDateFrom] = useState('');
 const [dateto, setDateto] = useState('');
 const [category, setCategories] = useState('');
 const { onOpen, onClose, isOpen } = useDisclosure();
 const fetchExpenses = () => {
  api
   .get('/expenses/filter', { params: { category, datefrom, dateto } })
   .then((res) => {
    setExpenses(res.data.data);
    setTotal(res.data.total);
   })
   .catch((err) => console.log(err));
 };
 useEffect(() => {
  fetchExpenses();
 }, [category, datefrom, dateto]);

 //  useEffect(() => {
 //   if (dateto && datefrom)
 //    api
 //     .get('/expenses/date-range', {
 //      params: {
 //       datefrom,
 //       dateto
 //      }
 //     })
 //     .then((res) => setTotal(res.data.total))
 //     .catch((err) => console.log(err));
 //   else setTotal(0);
 //  }, [dateto, datefrom]);

 //  useEffect(() => {
 //   api
 //    .get('/expenses/categories/' + category)
 //    .then((res) => setTotal(res.data.total))
 //    .catch((err) => console.log(err));
 //  }, [category]);
 return (
  <Center>
   <Center
    style={{ justifyContent: 'flex-start' }}
    bgColor={'white'}
    maxW={'600px'}
    w={'100%'}
    padding={'20px'}
    paddingTop={'60px'}
    flexDir={'column'}
    gap={'20px'}
    height={'100vh'}
   >
    <Box fontSize={'4xl'} fontWeight={'bold'}>
     Rp {total.toLocaleString('ID-id')}
    </Box>
    <Select
     maxW={'500px'}
     w="full"
     height={'60px'}
     onChange={(e) => setCategories(e.target.value)}
     value={category}
    >
     <option value="">All</option>
     <option value="transportation">Transportation</option>
     <option value="groceries">Groceries</option>
     <option value="entertaiment">Entertaiment</option>
     <option value="food">Food</option>
     <option value="sport">Sport</option>
    </Select>
    <Flex maxW={'500px'} w="full" gap={'20px'} height={'60px'}>
     <Input
      width={'full'}
      h={'full'}
      type="date"
      bgColor={'white'}
      onChange={(e) => {
       setDateFrom(e.target.value);
      }}
     />
     <Input
      width="full"
      h={'full'}
      type="date"
      bgColor={'white'}
      onChange={(e) => {
       setDateto(e.target.value);
      }}
     />
    </Flex>

    <Flex
     flexDir={'column'}
     w="full"
     alignItems={'center'}
     gap={'10px'}
     h={'full'}
     overflow={'auto'}
     className="scroll"
    >
     {expenses?.map((expense, key) => (
      <Card {...expense} key={key} fetch={fetchExpenses} />
     ))}
    </Flex>
    <Flex justifyContent={'right'} w="full" paddingRight={'20px'}>
     <Icon
      as={Expense}
      position={'absolute'}
      width={'60px'}
      height={'60px'}
      bottom={'30px'}
      onClick={onOpen}
      cursor={'pointer'}
     ></Icon>
    </Flex>
    <ModalCard isOpen={isOpen} onClose={onClose} fetch={fetchExpenses} />
   </Center>
  </Center>
 );
};

const Card = (props) => {
 const {
  id = 1,
  name = 'makan bakso',
  nominal = 30000,
  category = 'Food',
  date = '2023-09-1'
 } = props;
 const [icon, setIcon] = useState(Entertaiment);
 const { isOpen, onOpen, onClose } = useDisclosure();
 useEffect(() => {
  switch (category) {
   case 'entertaiment':
    setIcon(Entertaiment);
    break;
   case 'transportation':
    setIcon(Transportation);
    break;
   case 'groceries':
    setIcon(Groceries);
    break;
   case 'food':
    setIcon(Food);
    break;
   case 'sport':
    setIcon(Sport);
    break;
  }
 }, [id, category]);
 return (
  <Flex
   padding={'20px'}
   gap={'20px'}
   w={'full'}
   maxW={'500px'}
   bgColor={'#FCFCFC'}
   borderRadius={'24px'}
   alignItems={'center'}
  >
   <Icon
    onClick={onOpen}
    aspectRatio={1}
    width={'60px'}
    height={'60px'}
    as={icon}
    cursor={'pointer'}
   ></Icon>
   <Flex w={'full'} flexDir={'column'} fontSize={'xl'}>
    <Flex justifyContent={'space-between'} w={'full'} alignItems={'center'}>
     <Box style={{ fontWeight: '600' }}>{category}</Box>
     <Box style={{ color: 'red' }}>
      Rp {Number(nominal).toLocaleString('ID-id')}
     </Box>
    </Flex>
    <Flex
     justifyContent={'space-between'}
     w={'full'}
     alignItems={'center'}
     color={'#91919F'}
     fontSize={'1rem'}
    >
     <Box>{name}</Box>
     <Box>{date}</Box>
    </Flex>
   </Flex>
   <ModalCard isOpen={isOpen} onClose={onClose} {...props} />
  </Flex>
 );
};

const ModalCard = ({
 isOpen,
 onClose,
 id,
 name,
 nominal,
 date,
 category,
 fetch
}) => {
 const formik = useFormik({
  initialValues: {
   id: 0,
   name: '',
   nominal: '',
   date: moment().format('YYYY-MM-DD'),
   category: ''
  },
  onSubmit: async (values) => {
   if (values.id) await api.patch('/expenses/' + values.id, values);
   else await api.post('/expenses', values);
   fetch();
   formik.resetForm();
   onClose();
  }
 });

 useEffect(() => {
  const { setFieldValue } = formik;
  if (id) {
   setFieldValue('id', id);
   setFieldValue('name', name);
   setFieldValue('date', date);
   setFieldValue('nominal', nominal);
   setFieldValue('category', category);
  }
 }, [isOpen]);

 const deleteExpense = async () => {
  if (window.confirm('are you sure you want to delete this?')) {
   await api.delete('/expenses/' + formik.values.id);
   fetch();
   formik.resetForm();
   onClose();
  }
 };

 return (
  <Modal isOpen={isOpen} onClose={onClose} isCentered>
   <ModalOverlay />
   <ModalContent w="full" maxW={'600px'} h="full" padding={'30px'}>
    <Center w="full" flexDir={'column'} gap={'20px'}>
     <Center
      fontWeight={'semibold'}
      textTransform={'uppercase'}
      fontSize={'2xl'}
      w="full"
      justifyContent={'space-between'}
     >
      <Back width="30px" height="30px" onClick={onClose} />
      <span> Your Expense</span>
      <span>
       <Trash
        style={{ display: id ? 'block' : 'none' }}
        onClick={deleteExpense}
        width="25px"
        height="25px"
       />
      </span>
     </Center>
     <Input
      placeholder="title"
      value={formik.values.name}
      onChange={(e) => formik.setFieldValue('name', e.target.value)}
     />
     <Input
      placeholder="price"
      type="number"
      value={formik.values.nominal}
      onChange={(e) => formik.setFieldValue('nominal', e.target.value)}
     />
     <Input
      placeholder="date"
      type="date"
      value={formik.values.date}
      onChange={(e) => formik.setFieldValue('date', e.target.value)}
     />
     <Select
      value={formik.values.category}
      onChange={(e) => formik.setFieldValue('category', e.target.value)}
     >
      <option value="" disabled>
       Select Category
      </option>
      <option value="transportation">Transportation</option>
      <option value="groceries">Groceries</option>
      <option value="entertaiment">Entertaiment</option>
      <option value="food">Food</option>
      <option value="sport">Sport</option>{' '}
     </Select>
     <Button colorScheme="green" w="full" onClick={formik.handleSubmit}>
      Save
     </Button>
    </Center>
   </ModalContent>
  </Modal>
 );
};
