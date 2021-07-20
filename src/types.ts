import styled from "@material-ui/core/styles/styled";
import Box from "@material-ui/core/Box";
import { borders, compose, flexbox, sizing, spacing, typography } from "@material-ui/system";
import MuiButton from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";

export const ChipLabel = styled(Chip)(typography);
export const Container = styled(Box)(compose(sizing, spacing, flexbox));
export const Button = styled(MuiButton)(compose(spacing, borders));