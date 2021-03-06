<?php
/**
 * Rave Payment gateway for accepting credit card, debit card and bank account payment on you store
 * Copyright (C) 2016  2017
 *
 * This file is part of Flutterwave/Rave.
 *
 * Flutterwave/Rave is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

namespace Flutterwave\Rave\Model\Payment\Source;

use Magento\Framework\Option\ArrayInterface;

/**
 * Class PaymentMethod
 */
class PaymentMethod implements ArrayInterface
{
  /**
   * Possible environment types
   *
   * @return array
   */
  public function toOptionArray()
  {
    return [
      [
        'value' => 'both',
        'label' => 'All',
      ],
      [
        'value' => 'card',
        'label' => 'Card Only'
      ],
      [
        'value' => 'account',
        'label' => 'Account Only'
      ],
      [
        'value' => 'ussd',
        'label' => 'USSD only'
      ]
    ];
  }
}
