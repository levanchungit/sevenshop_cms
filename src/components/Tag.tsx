import { Box, Stack } from '@mui/material';

interface TagProps {
  borderColor?: string;
  backgroundColor: string;
  textColor: string;
  label: string;
  size?: 'small' | 'large';
}

export default function Tag(props: TagProps) {
  const { borderColor, backgroundColor, textColor, label, size = 'small' } = props;

  const sizeProps = {
    small: { fontSize: 12, height: 18 },
    large: { fontSize: 14, height: 24 },
  }[size];

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      borderRadius="3px"
      px="4px"
      width="fit-content"
      minWidth="40px"
      fontWeight="medium"
      {...sizeProps}
      color={textColor}
      borderColor={!borderColor ? backgroundColor : borderColor}
      bgcolor={backgroundColor}
      sx={{ borderStyle: 'solid', borderWidth: !borderColor ? 0 : '1px' }}
    >
      <Box className="ellipsis nowrap" component="span" m={0} lineHeight={1} fontSize="inherit">
        {label}
      </Box>
    </Stack>
  );
}
