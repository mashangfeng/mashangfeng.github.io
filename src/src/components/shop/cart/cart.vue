<template>
    <div class="shop-cart">
        <div class="shop-cart">
            <div class="shop-cartbasket">
                <div class="shop-grouphead single">
                    <a href="javascript" class="icon-cart-add "></a>
                    <div class="shop-grouphead-row">购物车
                        <a href="javascript">[清空]</a>
                    </div>
                </div>
                <div class="shop-cartbasket-tablerow">
                    <div class="cell itemname">冰红茶</div>
                    <div class="cell itemquantity">
                        <button>-</button>
                        <input type="text">
                        <button>+</button>
                    </div>
                    <div class="cell itemtotal">¥50</div>
                </div>
            </div>
            <div class="shop-cartfooter">
                <span class="icon-cart shop-carticon"></span>
                <div class="shop-cartfooter-text">
                    配送费￥4
                </div>
                <button class="shop-cartfooter-checkout ">购物车是空的</button>
            </div>
        </div>
    </div>
</template>
<script>


</script>
<style lang="scss">
.shop-cart {
    z-index: 102;
    position: fixed;
    right: 0;
    bottom: 0;
    width: 320px;
    height: 46px;
    font-size: 14px;
    .shop-cartbasket {
        z-index: 1;
        position: absolute;
        width: 100%;
        background-color: #fff;
        box-shadow: 0 1px 15px #ccc;
        top: -88px;
        .shop-grouphead {
            padding: 12px 10px;
            height: 45px;
            position: relative;
            font-size: 14px;
            border-bottom: 1px solid #eee;
            &.single {
                background-color: #fafafa;
                border-top: 2px solid #0089dc;
            }
            .icon-cart-add {
                position: absolute;
                top: 12px;
                right: 10px;
                width: 20px;
                height: 20px;
                font-size: 20px;
                color: #0089dc;
                cursor: pointer;
            }
        }
        .shop-cartbasket-tablerow {
            display: table;
            table-layout: fixed;
            height: 45px;
            width: 100%;
            padding: 0 10px;
            margin-top: -1px;
            .cell {
                display: table-cell;
                vertical-align: middle;
                border-bottom: 1px solid #eee;
                &.itemquantity {
                    width: 27%;
                    text-align: center;
                    button {
                        background-color: #fff;
                        height: 20px;
                        width: 20px;
                        line-height: 18px;
                        vertical-align: top;
                        border: 1px solid #ddd;
                        outline: 0;
                        cursor: pointer;
                        color: #666;
                    }
                    input {
                        border: 0;
                        height: 20px;
                        width: 30px;
                        border-top: 1px solid #ddd;
                        border-bottom: 1px solid #ddd;
                        line-height: 20px;
                        font-size: 12px;
                        vertical-align: top;
                        text-align: center;
                        outline: 0;
                        color: #666;
                    }
                }
                &.itemtotal {
                    text-align: right;
                    color: #f17530;
                }
            }
            .itemname {
                width: 50%;
                margin-right: 10px;
                font-size: 14px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                color: #666;
            }
        }
    }
    .shop-cartfooter {
        z-index: 2;
        position: relative;
        cursor: pointer;
        height: 46px;
        line-height: 46px;
        background-color: #2c2c2c;
        box-shadow: 0 1px 3px #2c2c2c;
        .shop-carticon {
            position: relative;
            width: 40px;
            text-align: center;
            color: #fff;
            font-size: 20px;
            display: inline-block;
            vertical-align: middle;
        }
        .shop-cartfooter-text {
            display: inline-block;
            vertical-align: middle;
            position: relative;
            font-size: 12px;
            margin-left: 2px;
            padding-left: 6px;
            color: #999;
            border-left: 1px solid #555;
            line-height: 1;
        }
        .shop-cartfooter-checkout {
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            border: 0;
            outline: 0;
            width: 120px;
            text-align: center;
            font-weight: 700;
            background-color: #e4e4e4;
            color: #333;
            cursor: default;
        }
    }
}

</style>
