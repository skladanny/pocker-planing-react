import { Box, Button, Container, Flex, Image, Text } from '@chakra-ui/react';
import { Formik, useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { ReactComponent as FibonacciIcon } from '../../assets/images/pokerPlanning/fibonacci.svg';
import PlaningIcon from '../../assets/images/pokerPlanning/planing.svg';
import { ReactComponent as PowersOf2Icon } from '../../assets/images/pokerPlanning/powersOf2.svg';
import { ReactComponent as TShirtsIcon } from '../../assets/images/pokerPlanning/tShirts.svg';
import { HeaderCreateMeeting, Input, QuestionModal } from '../../components';
import { ROUTES, VOTING_SYSTEMS } from '../../constants';
import { useCreateMeetingMutation } from '../../hooks';
import { pokerPlanningSchema } from '../../services/validation/';
import * as styles from './styles';

export const PokerPlanningCreate = () => {
  const { mutate, isLoading } = useCreateMeetingMutation();
  const history = useHistory();

  const handleArrowLeftClick = () => {
    history.push(ROUTES.retroMeetingCreate);
  };

  const handleFormSubmit = (values) => {
    mutate(values);
  };

  useEffect(() => {
    document.title = 'ScrumPokerPro | Poker planning meeting';
  }, []);

  return (
    <Container maxWidth={'container.lg'}>
      <HeaderCreateMeeting
        title={'Poker planning'}
        onArrowRightClick={handleArrowLeftClick}
      />
      <Flex alignItems={'center'} direction={'column'} mt={'6'} pb={'32px'}>
        <Box maxWidth={'470px'} width={'100%'}>
          <Image src={PlaningIcon} alt={'planning'} />
        </Box>
        <Box mx={'auto'} mt={'8'} maxWidth={'422px'} width={'100%'}>
          <Formik
            validationSchema={pokerPlanningSchema}
            initialValues={{
              name: '',
              type: 'PLANNING',
              votingSystem: VOTING_SYSTEMS.fibonacci,
            }}
            onSubmit={handleFormSubmit}
          >
            {({ handleSubmit }) => (
              <>
                <Input name={'name'} placeholder={'Meeting name'} mb={'24px'} />
                <Box mb={['54px', '64px']}>
                  <Text color={'black.50'} fontWeight={'bold'} mb={'8px'}>
                    Voting system
                  </Text>
                  <Flex
                    pb={{
                      sm: '12px',
                      md: 0,
                    }}
                    overflowX={'auto'}
                    justifyContent={['flex-start', 'space-between']}
                  >
                    <Box>
                      <PokerPlaningVotingSystemCard
                        image={<FibonacciIcon />}
                        title={'Fibonacci'}
                        value={VOTING_SYSTEMS.fibonacci}
                      />
                    </Box>
                    <Box
                      ml={{
                        sm: '16px',
                        md: 0,
                      }}
                    >
                      <PokerPlaningVotingSystemCard
                        image={<PowersOf2Icon />}
                        title={'Powers of 2'}
                        value={VOTING_SYSTEMS.powerOf2}
                      />
                    </Box>
                    <Box
                      ml={{
                        sm: '16px',
                        md: 0,
                      }}
                    >
                      <PokerPlaningVotingSystemCard
                        image={<TShirtsIcon />}
                        title={'T-shirts'}
                        value={VOTING_SYSTEMS.tShirts}
                      />
                    </Box>
                  </Flex>
                </Box>
                <Button
                  isLoading={isLoading}
                  onClick={handleSubmit}
                  isFullWidth
                >
                  Start meeting
                </Button>
              </>
            )}
          </Formik>
        </Box>
      </Flex>
      <QuestionModal title={'hello world'}>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum a
          nisl arcu a aliquet. Volutpat bibendum mi aliquet feugiat lorem.
          Semper rhoncus enim tortor pretium varius mi.
        </Text>
        <Text>
          Nisi, mi nisi volutpat sed faucibus risus, velit. Blandit et augue
          augue leo suscipit ultrices.
        </Text>
      </QuestionModal>
    </Container>
  );
};

const PokerPlaningVotingSystemCard = ({ image, title, value }) => {
  const { values, setFieldValue } = useFormikContext();

  const handleClick = () => {
    setFieldValue('votingSystem', value);
  };

  const isActive = value === values.votingSystem;

  return (
    <Flex onClick={handleClick} css={styles.card(isActive)} as='button'>
      <Box mb={'26px'}>{image}</Box>
      <Text>{title}</Text>
    </Flex>
  );
};

PokerPlaningVotingSystemCard.propTypes = {
  image: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
