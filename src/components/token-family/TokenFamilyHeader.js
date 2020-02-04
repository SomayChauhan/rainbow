import PropTypes from 'prop-types';
import React from 'react';
import FastImage from 'react-native-fast-image';
import Animated, { Easing } from 'react-native-reanimated';
import { toRad, useTimingTransition } from 'react-native-redash';
import CaretImageSource from '../../assets/family-dropdown-arrow.png';
import { colors } from '../../styles';
import { ButtonPressAnimation, interpolate } from '../animations';
import Highlight from '../Highlight';
import { Row, RowWithMargins } from '../layout';
import { Emoji, TruncatedText, Monospace } from '../text';
import TokenFamilyHeaderIcon from './TokenFamilyHeaderIcon';

const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

const TokenFamilyHeaderAnimationDuration = 200;
const TokenFamilyHeaderHeight = 50;

const TokenFamilyHeader = ({
  childrenAmount,
  emoji,
  familyImage,
  highlight,
  isCoinRow,
  isOpen,
  onPress,
  title,
}) => {
  const animation = useTimingTransition(isOpen, {
    duration: TokenFamilyHeaderAnimationDuration,
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });

  return (
    <ButtonPressAnimation
      key={`${emoji || familyImage || title}_${isOpen}`}
      onPress={onPress}
      scaleTo={0.98}
    >
      <Row
        align="center"
        backgroundColor={colors.white}
        height={TokenFamilyHeaderHeight}
        justify="space-between"
        paddingHorizontal={isCoinRow ? 16 : 19}
        width="100%"
      >
        <Highlight visible={highlight} />
        <RowWithMargins align="center" margin={emoji ? 5 : 9}>
          {emoji ? (
            <Emoji size="lmedium" name={emoji} />
          ) : (
            <TokenFamilyHeaderIcon
              familyImage={familyImage}
              familyName={title}
              isCoinRow={isCoinRow}
            />
          )}
          <TruncatedText
            letterSpacing="tight"
            lineHeight="normal"
            size="lmedium"
            style={{ marginBottom: 1 }}
            weight="semibold"
          >
            {title}
          </TruncatedText>
        </RowWithMargins>
        <RowWithMargins align="center" margin={14}>
          <Animated.View
            style={{
              opacity: interpolate(animation, {
                inputRange: [0, 1],
                outputRange: [1, 0],
              }),
            }}
          >
            <Monospace color="dark" size="lmedium" style={{ marginBottom: 1 }}>
              {childrenAmount}
            </Monospace>
          </Animated.View>
          <AnimatedFastImage
            resizeMode={FastImage.resizeMode.contain}
            source={CaretImageSource}
            style={{
              height: 17,
              marginBottom: 1,
              right: 4,
              transform: [
                {
                  rotate: toRad(
                    interpolate(animation, {
                      inputRange: [0, 1],
                      outputRange: [0, 90],
                    })
                  ),
                },
              ],
              width: 9,
            }}
          />
        </RowWithMargins>
      </Row>
    </ButtonPressAnimation>
  );
};

TokenFamilyHeader.animationDuration = TokenFamilyHeaderAnimationDuration;

TokenFamilyHeader.height = TokenFamilyHeaderHeight;

TokenFamilyHeader.propTypes = {
  childrenAmount: PropTypes.number,
  emoji: PropTypes.string,
  familyImage: PropTypes.string,
  highlight: PropTypes.bool,
  isCoinRow: PropTypes.bool,
  isOpen: PropTypes.bool,
  onPress: PropTypes.func,
  title: PropTypes.string,
};

TokenFamilyHeader.defaultProps = {
  // emoji: 'sunflower',
};

export default TokenFamilyHeader;
