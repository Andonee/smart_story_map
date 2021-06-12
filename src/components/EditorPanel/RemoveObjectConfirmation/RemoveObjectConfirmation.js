import React from 'react'
import styled from 'styled-components'
import CustomButton from '../../UI/CustomButton'

const RemoveObjectConfirmation = ({ onRemoveObjectHandler }) => {
	const onClickHandler = e => {
		const action = e.target.innerText

		onRemoveObjectHandler(action)
	}
	return (
		<StyledWrapper>
			<div>Are you sure you want to remove this object?</div>
			<StyledDivider />
			<StyledEditBtnWrapper>
				<CustomButton
					text='Yes'
					size='small'
					variant='contained'
					onClick={onClickHandler}
				/>
				<CustomButton
					text='No'
					size='small'
					variant='contained'
					onClick={onClickHandler}
				/>
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

const StyledDivider = styled.div`
	&& {
		width: 90%;
		height: 1px;
		background: #cccccc;
		margin: 20px 0;
	}
`
