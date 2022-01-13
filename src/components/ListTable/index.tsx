import {
  DeleteIcon,
  TriangleDownIcon,
  TriangleUpIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  ViewIcon
} from '@chakra-ui/icons'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  IconButton,
  Text,
  Tooltip,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useColorModeValue,
  Flex
} from '@chakra-ui/react'
import { Button } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks'
import format from 'date-fns/format'

import { useEffect, useMemo, useState } from 'react'
import { useTable, useSortBy, usePagination } from 'react-table'
import { useRouter } from 'next/router'
import DialogDevotionalDelete from '../DialogDevotionalDelete'

interface TableSellersProps {
  data?: any
  variant?: boolean
}

const ListTable: React.FC<TableSellersProps> = (props) => {
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [dataDelete, setDataDelete] = useState(null)

  function handleView(data: any) {
    router.push(`/devotional/view_devotional/${data.user.id}/${data.id}`)
  }

  function handleDelete(data: any) {
    setDataDelete(data)
    onOpen()
  }

  const handleResetFields = () => {
    onClose()
  }

  const data = useMemo(() => (props.data ? props.data : []), [props.data])

  const columns = useMemo(
    () => [
      {
        Header: 'data',
        accessor: 'creation_date',
        // isNumeric: true,
        Cell: ({ value }) => {
          return format(new Date(value), 'dd/MM/yyyy')
        }
      },

      {
        Header: 'Livro',
        accessor: 'book.name'
      },

      {
        Header: 'Capítulo',
        accessor: 'chapter'
      },
      {
        Header: 'Versículos',
        accessor: 'verses'
      },
      {
        Header: 'Ações',
        accessor: 'action',
        isNumeric: true,
        // eslint-disable-next-line react/display-name
        Cell: (value) => {
          const data = value.data[value.row.id]

          return (
            <Flex alignItems="center" justifyContent="end">
              <Button
                onClick={() => handleView(data)}
                colorScheme={useColorModeValue('teal', null)}
                mr="1"
                size="xs"
              >
                <ViewIcon />
              </Button>
              <Button
                onClick={() => handleDelete(data)}
                colorScheme={useColorModeValue('red', null)}
                size="xs"
              >
                <DeleteIcon />
              </Button>
            </Flex>
          )
        }
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.variant]
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setHiddenColumns,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 }
    },
    useSortBy,
    usePagination
  )

  useEffect(() => {
    if (!props.variant) {
      setHiddenColumns(['book.name', 'verses', 'chapter'])
    }
  }, [setHiddenColumns, props.variant])

  return (
    <>
      <DialogDevotionalDelete
        data={dataDelete}
        isOpen={isOpen}
        onClose={onClose}
        resetFields={handleResetFields}
      />
      <Table size="sm" {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => {
            const { key, ...restHeaderGroupProps } =
              headerGroup.getHeaderGroupProps()
            return (
              <Tr key={key} {...restHeaderGroupProps}>
                {headerGroup.headers.map((column) => {
                  const { key, ...restColumn } = column.getHeaderProps(
                    column.getSortByToggleProps()
                  )
                  return (
                    <Th key={key} {...restColumn} isNumeric={column.isNumeric}>
                      {column.render('Header')}
                      <chakra.span pl="4">
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <TriangleDownIcon aria-label="sorted descending" />
                          ) : (
                            <TriangleUpIcon aria-label="sorted ascending" />
                          )
                        ) : null}
                      </chakra.span>
                    </Th>
                  )
                })}
              </Tr>
            )
          })}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row)
            const { key, ...restRowProps } = row.getRowProps()
            return (
              <Tr key={key} {...restRowProps}>
                {row.cells.map((cell) => {
                  const { key, ...restCellProps } = cell.getCellProps()
                  return (
                    <Td
                      key={key}
                      {...restCellProps}
                      isNumeric={cell.column.isNumeric}
                      // fontSize={{ base: '10px', md: '' }}
                    >
                      {cell.render('Cell')}
                    </Td>
                  )
                })}
              </Tr>
            )
          })}
        </Tbody>
      </Table>

      <Flex justifyContent="space-between" m={4} alignItems="center">
        <Flex>
          <Tooltip label="Primeira Página">
            <IconButton
              onClick={() => gotoPage(0)}
              isDisabled={!canPreviousPage}
              icon={<ArrowLeftIcon h={3} w={3} />}
              mr={4}
              aria-label="Primeira Página"
            />
          </Tooltip>
          <Tooltip label="Página Anterior">
            <IconButton
              onClick={previousPage}
              isDisabled={!canPreviousPage}
              icon={<ChevronLeftIcon h={6} w={6} />}
              aria-label="Página Anterior"
            />
          </Tooltip>
        </Flex>

        <Flex alignItems="center">
          <Text fontSize={{ base: '9px', md: '16px' }} mr={8}>
            Página{' '}
            <Text fontWeight="bold" as="span">
              {pageIndex + 1}
            </Text>{' '}
            de{' '}
            <Text fontWeight="bold" as="span">
              {pageOptions.length}
            </Text>
          </Text>
          <Flex alignItems="center" hidden={!props.variant}>
            <Text>Vá para página:</Text>{' '}
            <NumberInput
              ml={2}
              mr={8}
              w={28}
              min={1}
              max={pageOptions.length}
              onChange={(value: any) => {
                const page = value ? value - 1 : 0
                gotoPage(page)
              }}
              defaultValue={pageIndex + 1}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Select
              w={32}
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value))
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Exibir {pageSize}
                </option>
              ))}
            </Select>
          </Flex>
        </Flex>

        <Flex>
          <Tooltip label="Próxima Página">
            <IconButton
              onClick={nextPage}
              isDisabled={!canNextPage}
              icon={<ChevronRightIcon h={6} w={6} />}
              aria-label="Próxima Página"
            />
          </Tooltip>
          <Tooltip label="Última Página">
            <IconButton
              onClick={() => gotoPage(pageCount - 1)}
              isDisabled={!canNextPage}
              icon={<ArrowRightIcon h={3} w={3} />}
              ml={4}
              aria-label="Última Página"
            />
          </Tooltip>
        </Flex>
      </Flex>
    </>
  )
}

export default ListTable
