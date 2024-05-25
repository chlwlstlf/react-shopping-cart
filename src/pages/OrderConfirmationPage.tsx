import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { css } from "@emotion/css";

import { cartItemCheckedIdsAtom, cartItemsAtom, couponUsedAtom } from "../recoil/atom/atom";
import { totalCountSelector } from "../recoil/selector/selector";
import { fetchCartItems } from "../api/cartItemApi";
import { CartLayout, Header, Content, Footer } from "../components/layout";
import { CouponModal, OrderItems, PaymentSummary, ShippingInfo } from "../components/orderConfirmationPage";
import { Button, Title } from "../components/default";
import LeftArrow from "../assets/LeftArrow.svg?react";

const OrderConfirmationPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useRecoilState(cartItemsAtom);
  const cartItemCheckedIds = useRecoilValue(cartItemCheckedIdsAtom);
  const cartTotalCount = useRecoilValue(totalCountSelector);
  const [couponUsed, setCouponUsed] = useRecoilState(couponUsedAtom);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedCartItems = await fetchCartItems();
      setCartItems(fetchedCartItems);
    };

    fetchData();
  }, []);

  const description = `총 ${cartItemCheckedIds.length}종류의 상품 ${cartTotalCount}개를 주문합니다.
  최종 결제 금액을 확인해 주세요.`;

  const handlePrevClick = () => {
    navigate(-1);
  };

  const handleClick = () => {
    navigate("/paymentConfirmation");
  };

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => {
    setIsOpen(false);
    setCouponUsed(false);
  };

  const handleConfirm = () => {
    setIsOpen(false);
    setCouponUsed(true);
  };

  return (
    <CartLayout>
      <CouponModal
        isOpen={isOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />

      <Header>
        <LeftArrow
          className={leftArrowBtnCSS}
          onClick={handlePrevClick}
        />
      </Header>

      <Content>
        <Title
          title="주문 확인"
          description={description}
        />
        <OrderItems />
        <Button
          variant="secondary"
          size="large"
          onClick={handleOpen}
        >
          쿠폰 적용
        </Button>
        <ShippingInfo />
        <PaymentSummary />
      </Content>

      <Footer
        text="결제하기"
        isActive={true}
        onClick={handleClick}
      />
    </CartLayout>
  );
};

export default OrderConfirmationPage;

const leftArrowBtnCSS = css`
  cursor: pointer;
`;
