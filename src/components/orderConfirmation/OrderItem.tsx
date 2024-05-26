import { css } from "@emotion/css";

import { Product } from "../../types/product";
import { Splitter } from "../default";
import { formatCurrency } from "../../utils/formatCurrency";

interface CartItemProps {
  product: Product;
}

const OrderItem = ({ product }: CartItemProps) => {
  return (
    <div className={ItemCSS}>
      <Splitter />

      <div className={ItemContentCSS}>
        <img
          src={product.product.imageUrl}
          className={ItemImageCSS}
        />
        <div className={ItemInfoWithCountCSS}>
          <div className={ItemInfoCSS}>
            <div className={ItemNameCSS}>{product.product.name}</div>
            <div className={ItemPriceCSS}>{formatCurrency(product.product.price)}</div>
          </div>
          <div className={ItemCountCSS}>{product.quantity}개</div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;

const ItemCSS = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ItemContentCSS = css`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const ItemImageCSS = css`
  width: 112px;
  height: 112px;
  border-radius: 8px;
`;

const ItemInfoWithCountCSS = css`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
const ItemInfoCSS = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const ItemNameCSS = css`
  font: var(--cart-label);
  color: var(--grey-400);
`;
const ItemPriceCSS = css`
  font: var(--cart-title);
`;
const ItemCountCSS = css`
  font: var(--cart-label);
  color: var(--grey-400);
`;
