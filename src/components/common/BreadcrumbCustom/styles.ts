import styled from 'styled-components'

export const BreadcrumbWrapper = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;

  .breadcrumb-item {
    &__name {
      font-weight: 600;
      font-size: 16px;
      line-height: 22px;
    }
    &__link {
      cursor: pointer;
      &:hover {
        color: ${({ theme }) => theme.palette.primary} !important;
      }
    }
  }

  .ant-breadcrumb > span:last-child {
    color: ${({ theme }) => theme.palette.primary} !important;
  }
`
