import React from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'

const RemoveObjectConfirmation = ({ onRemoveObjectHandler }) => {
	const onClickHandler = e => {
		console.log(e.target.innerText)
		const action = e.target.innerText

		onRemoveObjectHandler(action)
	}
	return (
		<StyledWrapper>
			<div>Are you sure you want to remove this object?</div>
			<StyledDivider />
			<StyledEditBtnWrapper>
				<StyledEditBtn onClick={onClickHandler}>Yes</StyledEditBtn>
				<StyledEditBtn onClick={onClickHandler}>No</StyledEditBtn>
			</StyledEditBtnWrapper>
		</StyledWrapper>
	)
}

export default RemoveObjectConfirmation

const StyledWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	/* width: 90%; */
	/* max-width: 95%; */
	/* height: 90%; */
	/* max-height: 85%; */
	/* background: green; */
	margin-top: 20px;
`
const StyledEditBtnWrapper = styled.div`
	&& {
		width: 100%;
		display: flex;
		justify-content: space-between;
		width: 150px;
	}
`

const StyledEditBtn = styled(Button)`
	&& {
		${({ theme }) => `
	
		background: ${theme.palette.info.main};
    color: #fff;

		&:hover {
			background: ${theme.palette.info.light};
		}
		`}
	}
`
const StyledDivider = styled.div`
	&& {
		width: 90%;
		height: 1px;
		background: #cccccc;
		margin: 20px 0;
	}
`
