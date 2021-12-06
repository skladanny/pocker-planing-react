import { Box, Flex, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';
import { RiDeleteBinLine } from 'react-icons/all';
import { NavLink } from 'react-router-dom';

import { ReactComponent as PlaningIcon } from '../../../assets/images/pokerPlanning/planing.svg';
import { ReactComponent as RetroIcon } from '../../../assets/images/retroMeeting/dashboard.svg';
import { ROUTES } from '../../../constants';
import * as styles from '../styles';

export const HomeMeetingCard = ({ onRemove, data }) => {
  return (
    <Box maxWidth={'100%'} sx={styles.meetingCard}>
      <NavLink
        to={ROUTES.home}
      >
        <Box position={'relative'} mb={'18px'}>
          {data.type === 'RETRO' ? <RetroIcon /> : <PlaningIcon />}
          <Box css={styles.cardContent}>
            <Text css={styles.imageCardText} fontSize={['12px', '13px']}>
              {data.type}
            </Text>
          </Box>
        </Box>
      </NavLink>
      <Flex css={styles.cardContentBottom}>
        <Box>
          <NavLink
            to={ROUTES.home}
          >
            <Text fontWeight={'bold'}>
              {data?.name.length < 25
                ? data?.name
                : data?.name.slice(0, 25) + '...'}
            </Text>
          </NavLink>
        </Box>
        <Box
          as={'button'}
          onClick={() => onRemove(data.id)}
          css={styles.remove}
        >
          <RiDeleteBinLine size={'24px'} color={'#000000'} opacity={'.32'} />
        </Box>
      </Flex>
    </Box>
  );
};

HomeMeetingCard.propTypes = {
  data: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
};
