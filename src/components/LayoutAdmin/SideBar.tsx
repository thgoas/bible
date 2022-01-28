import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Box,
  Collapse,
  Flex,
  Icon,
  Link,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react'
import { NextPage } from 'next'
import NextLink from 'next/link'

import { NAV_ITEMS, NavItem } from './items'

const SideBar: NextPage = () => {
  const MobileNavItem = ({ label, children, href }: NavItem) => {
    const { isOpen, onToggle } = useDisclosure()

    return (
      <Stack spacing={4} onClick={children && onToggle}>
        <NextLink href={href ?? '#'}>
          <Flex
            py={2}
            as={Link}
            justify={'space-between'}
            align={'center'}
            _hover={{
              textDecoration: 'none'
            }}
          >
            <Text
              fontWeight={600}
              color={useColorModeValue('gray.600', 'gray.200')}
            >
              {label}
            </Text>
            {children && (
              <Icon
                as={ChevronDownIcon}
                transition={'all .25s ease-in-out'}
                transform={isOpen ? 'rotate(180deg)' : ''}
                w={6}
                h={6}
              />
            )}
          </Flex>
        </NextLink>
        <Collapse
          in={isOpen}
          animateOpacity
          style={{ marginTop: '0!important' }}
        >
          <Stack
            mt={2}
            pl={4}
            borderLeft={1}
            borderStyle={'solid'}
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            align={'start'}
          >
            {children &&
              children.map((child) => (
                <Link key={child.label} py={2} href={child.href}>
                  {child.label}
                </Link>
              ))}
          </Stack>
        </Collapse>
      </Stack>
    )
  }

  return (
    <>
      <Box
        position={'fixed'}
        height={'100vh'}
        width={'60'}
        // bg={'green'}
        border={'1px'}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.700')}
        display={{ base: 'none', md: 'block' }}
        color={useColorModeValue('gray.600', 'gray.200')}
        // bg={useColorModeValue('white', 'gray.700')}
      >
        <Stack
          // bg={useColorModeValue('white', 'gray.700')}
          p={4}
          mt="60px"
          // display={{ md: 'none' }}
        >
          {NAV_ITEMS.map((navItem) => (
            <MobileNavItem key={navItem.label} {...navItem} />
          ))}
        </Stack>
      </Box>
    </>
  )
}

export default SideBar
