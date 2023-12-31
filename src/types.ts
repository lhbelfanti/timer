import Box from "@material-ui/core/Box";
import MuiButton from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import styled from "@material-ui/core/styles/styled";
import {
  borders,
  compose,
  flexbox,
  sizing,
  spacing,
  typography
} from "@material-ui/system";

export const ChipLabel = styled(Chip)(typography);
export const Container = styled(Box)(compose(sizing, spacing, flexbox));
export const Button = styled(MuiButton)(compose(spacing, borders));
